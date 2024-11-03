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
      const events = []

      // Step 1: Gather all events and mark their start and end on the timeline
      this.schedules.forEach(schedule => {
        const dayEvents = schedule.filter(event => event.day === day)
        dayEvents.forEach(({ startTime, endTime }) => {
          events.push({ time: startTime, type: 'start' })
          events.push({ time: endTime, type: 'end' })
        })
      })

      // Step 2: Sort events by time, prioritizing 'end' before 'start' if times are the same
      events.sort((a, b) => {
        if (a.time === b.time) return a.type === 'end' ? -1 : 1
        return a.time.localeCompare(b.time)
      })

      const commonIntervals = []
      let currentOverlapCount = 0
      let intervalStart = null

      // Step 3: Sweep through events to find overlaps
      events.forEach(event => {
        if (event.type === 'start') {
          currentOverlapCount += 1
          // Start a new interval if we reach at least two overlapping schedules
          if (currentOverlapCount === 2) {
            intervalStart = event.time
          }
        } else {
          // If we're ending an overlap that has at least two schedules, record it
          if (currentOverlapCount >= 2 && intervalStart) {
            commonIntervals.push({
              startTime: intervalStart,
              endTime: event.time,
              overlapCount: currentOverlapCount
            })
            intervalStart = null
          }
          currentOverlapCount -= 1
        }
      })

      // Step 4: Sort intervals by overlap count (descending), then by duration (descending)
      commonIntervals.sort((a, b) => {
        // Compare by overlap count first
        if (b.overlapCount !== a.overlapCount)
          return b.overlapCount - a.overlapCount
        // If overlap counts are equal, compare by duration
        const durationA =
          new Date(`2000-01-01T${a.endTime}:00Z`).getTime() -
          new Date(`2000-01-01T${a.startTime}:00Z`).getTime()
        const durationB =
          new Date(`2000-01-01T${b.endTime}:00Z`).getTime() -
          new Date(`2000-01-01T${b.startTime}:00Z`).getTime()
        return durationB - durationA
      })

      return commonIntervals
    }
  },
  persist: true
})
