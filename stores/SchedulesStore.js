import { Capacitor } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences'

export const useSchedulesStore = defineStore('schedules', {
  state: () => ({
    schedules: []
  }),
  actions: {
    addEvent(schedule, event) {
      if (!this.schedules[schedule]) {
        this.schedules[schedule] = []
      }
      this.schedules[schedule].push(event)
      this.orderByStartTime()
    },
    getEventsForDay(schedule, day) {
      return this.schedules[schedule]?.filter(event => event.day === day) ?? []
    },
    orderByStartTime() {
      this.schedules.forEach(schedule => {
        schedule.sort((a, b) => {
          if (a.startTime > b.startTime) {
            return 1
          } else if (a.startTime < b.startTime) {
            return -1
          } else {
            return 0
          }
        })
      })
    },
    removeEvent(schedule, event) {
      const index = this.schedules[schedule].indexOf(event)
      if (index > -1) {
        this.schedules[schedule].splice(index, 1)
      }
      this.orderByStartTime()
    },
    removeSchedule(schedule) {
      this.schedules.splice(schedule, 1)
      this.orderByStartTime()
    },
    encodeSchedule(s) {
      if (!this.schedules[s]) {
        return ''
      }

      return encodeURIComponent(
        btoa(
          JSON.stringify(
            this.schedules[s].map(event => [
              event.day,
              event.startTime,
              event.endTime
            ])
          )
        )
      )
    },
    decodeSchedule(s) {
      try {
        let decoded = JSON.parse(atob(decodeURIComponent(s)))

        decoded = decoded.map(event => {
          return {
            day: event[0],
            startTime: event[1],
            endTime: event[2]
          }
        })

        if (decoded) {
          const existingSchedule = this.schedules.find(schedule => {
            return (
              schedule.length === decoded.length &&
              schedule.every((event, i) => {
                return (
                  event.day === decoded[i].day &&
                  event.startTime === decoded[i].startTime &&
                  event.endTime === decoded[i].endTime
                )
              })
            )
          })

          if (!existingSchedule) {
            this.schedules.push(decoded)
          }
        }

        this.orderByStartTime()
      } catch (e) {
        alert('Invalid timetable')
      }
    },
    findCommonIntervals(day) {
      const intervals = []

      // Collect all intervals for the specified day across all schedules
      this.schedules.forEach(schedule => {
        const dayEvents = schedule.filter(event => event.day === day)
        dayEvents.forEach(({ startTime, endTime }) => {
          intervals.push({ startTime, endTime })
        })
      })

      // Sort intervals by start time for easier processing
      intervals.sort((a, b) => a.startTime.localeCompare(b.startTime))

      const mergedIntervals = []
      let tempInterval = null

      intervals.forEach(({ startTime, endTime }) => {
        if (!tempInterval) {
          tempInterval = { startTime, endTime, count: 1 }
        } else {
          // Check if there is an overlap or if intervals are within 5 minutes of each other
          const tempEnd = new Date(
            `2000-01-01T${tempInterval.endTime}:00Z`
          ).getTime()
          const currStart = new Date(`2000-01-01T${startTime}:00Z`).getTime()

          // Merge intervals if they overlap or are within a threshold (5 mins here)
          if (currStart <= tempEnd + 5 * 60 * 1000) {
            // Merge by averaging start and end times
            const tempStart = new Date(
              `2000-01-01T${tempInterval.startTime}:00Z`
            ).getTime()
            const currEnd = new Date(`2000-01-01T${endTime}:00Z`).getTime()

            const newStart = new Date((tempStart + currStart) / 2)
              .toISOString()
              .substr(11, 5)
            const newEnd = new Date((tempEnd + currEnd) / 2)
              .toISOString()
              .substr(11, 5)

            tempInterval.startTime = newStart
            tempInterval.endTime = newEnd
            tempInterval.count += 1
          } else {
            // Push the completed interval and start a new one
            mergedIntervals.push(tempInterval)
            tempInterval = { startTime, endTime, count: 1 }
          }
        }
      })

      // Push the last interval
      if (tempInterval) {
        mergedIntervals.push(tempInterval)
      }

      return mergedIntervals
    }
  },
  persist: {
    storage: Capacitor.isNativePlatform()
      ? Preferences
      : import.meta.client
        ? localStorage
        : null
  }
})
