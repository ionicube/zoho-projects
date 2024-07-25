'use server'
import {listAllProjects} from "@/utils/listAllProjects";
import {makeAPICall} from "@/utils/makeAPICall";
import {appendGoogleSheetsData, getGoogleSheetsData, updateGoogleSheetsData} from "@/utils/googleSheet";
import { subMonths, format, addMonths } from 'date-fns'
function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
const componentTypes = [
  'task',
  // 'bug',
  'general'
]
export async function timeSheetAction (accessToken: string, portal: string) {
  const p = await listAllProjects(accessToken, portal)
  const {projects, error} = p
  if (error?.code) {
    throw new Error(error.code)
  }
  // @ts-ignore
  const sheetData = await getGoogleSheetsData('zoho-timesheets!A2:Z') || []
  const logs: Array<Array<string>> = []
  const tasks: Array<Array<string>> = []
  console.log(`existing logs: ${sheetData.length}`)
  let start_date, end_date
  if (sheetData.length && sheetData[sheetData.length - 1][24]) {
    start_date = new Date(sheetData[sheetData.length - 1][24])
    end_date = addMonths(new Date(), 1)
  } else {
    end_date = new Date(2023, 5, 1)
    start_date = subMonths(end_date, 6)
  }
  let startRow = sheetData.length + 2
  for (const project of projects) {
    const {
      id_string: id,
      name: projectName,
      owner_email,
      role,
      group_name
    } = project
    // tasks
    console.log(`tasks length: ${tasks.length}`)
    const taskUrl = `/restapi/portal/${portal}/projects/${id}/tasks/`
    let taskData
    try {
      console.log(`get tasks from ${taskUrl}`)
      taskData = await makeAPICall(taskUrl, accessToken)
      await sleep(1000)
    } catch (err) {
      console.log(err)
    }

    if (taskData) {
      const {
        tasks: tasksList
      } = taskData
      if (tasksList) {
        for (const task of tasksList) {
          if (taskData.error?.code) {
            throw new Error(taskData.error.code)
          }
          const row = [
            task.name,
            // @ts-ignore
            (task.details?.owners || []).map(({ full_name }) => full_name).join(','),
            task.status?.name,
            '', // tags ??
            task.start_date_format,
            task.end_date_format, // due date ??
            task.duration,
            task.priority,
            task.created_person,
            task.percent_complete,
            '', // competion date ??
            Number(task.log_hours?.non_billable_hours || 0) + Number(task.log_hours?.billable_hours || 0), // work hours
            Number(task.log_hours?.non_billable_hours || 0) + Number(task.log_hours?.billable_hours || 0), // actual hours
            '', // Planned Cost
            '', // Actual Cost
            '', // Budget Balance
            '', // Rate Per Hour
            task.forecasted_hours, // Forecasted Hours
            '', // Forecasted Cost,
            task.billingtype,
            '', // budget,
            '', // Cost Per Hour
            projectName,
            task.key,
            task.id_string
          ]
          tasks.push(row)
        }
      }
    }
    for (const componentType of componentTypes) {
      const url = `/restapi/portal/${portal}/projects/${id}/logs/?`

      const params = new URLSearchParams({
        users_list: 'all',
        view_type: 'custom_date',
        bill_status: 'all',
        custom_date: JSON.stringify({
          start_date: format(start_date, 'MM-dd-yyyy'), end_date: format(end_date, 'MM-dd-yyyy'),
        }),
        date: format(end_date, 'MM-dd-yyyy'),
        component_type: componentType
      })
      console.log(`get time log from ${url + params}`)
      let data
      try {
        data = await makeAPICall(url + params, accessToken)
        await sleep(1000)
      } catch (err) {
        continue
      }
      if (!data) continue
      if (data.error?.code) {
        throw new Error(data.error.code)
      }
      const {
        timelogs
      } = data
      if (!timelogs) continue
      for (const { tasklogs = [], generallogs = [], date: logDate } of timelogs.date) {
        const tl = componentType === 'task' ? tasklogs : generallogs
        for (const log of tl) {
          const existIndex = sheetData.findIndex((row: Array<string>) => row[2] === log.id_string)
          console.log(`existIndex: ${existIndex}`)
          const row = [
            log.owner_name,
            componentType === 'task' ? log.task?.name : log.name,
            log.id_string,
            log?.task?.id_string,
            projectName,
            id,
            log.hours_display,
            log?.start_time ? `${log?.start_time} - ${log?.end_time}` : '',
            log.bill_status,
            log.notes,
            '', // log cost??
            log.added_by.name,
            log.hours,
            '', // Rate Per Hour??
            owner_email,
            role,
            componentType,
            group_name,
            '', // milestone ??
            log?.task_list?.name,
            log?.start_time ? `${log?.start_time} - ${log?.end_time}` : '',
            log.notes,
            log.created_time_format,
            '', // cost per hour ??
            // log.created_date,
            logDate,
            log.last_modified_time_format
          ]
          if (existIndex > -1) {
            await updateGoogleSheetsData(`zoho-timesheets!A${existIndex + 2}:Z`, [row])
          }else {
            logs.push(row)
          }

          // startRow++
          // await updateGoogleSheetsData(`zoho-timesheets!A${startRow}:Z`, data)
        }
      }

    }
  }
  await updateGoogleSheetsData(`tasks!A2:Y`, tasks)
  const toWrite = logs.toReversed()
  toWrite.sort((a, b) => new Date(a[24]).getTime() - new Date(b[24]).getTime())
  if (logs.length > 0) return await appendGoogleSheetsData(`zoho-timesheets!A${startRow}:Z`, toWrite)
  console.log('No new logs added to google sheets')
  return true
}
