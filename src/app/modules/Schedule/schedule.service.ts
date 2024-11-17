import { addHours, format } from "date-fns"
const insertIntoDB = async (payload: any) => {
    const { statDate, endDate, statTime, endTime } = payload
    const currentDate = new Date(statDate)
    const lastDate = new Date(endDate)
    while (currentDate <= lastDate) {
        const statDateTime = new Date(
            addHours(
                `${format(currentDate, 'yyyy-MM-dd')}`,
                Number(statTime.split(':')[0])
            )
        )
        const endDateTime = new Date(
            addHours(
                `${format(lastDate, 'yyyy-MM-dd')}`,
                Number(endTime.split(':')[0])
            )
        )
        console.log(endDateTime);
    }
}


export const ScheduleServices = {
    insertIntoDB
}