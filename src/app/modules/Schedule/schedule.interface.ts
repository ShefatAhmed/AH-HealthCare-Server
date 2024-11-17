export type ISchedule = {
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string
}

export type IFillterRequest = {
    startDate?: string | undefined;
    endDate?: string | undefined;
}