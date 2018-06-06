const project_attendance = {                // 18
  Professor: {                              // 9 
    firebase_key: {                         // 20 
      name: 'string_length_60',
      phone: 'string_length_10',
      photoUrl: 'string_length_100',
      professorID: 'string_length_100',
      subjects: {                           // 8
        subject_key: {                      // 18
          name: 'string_length_100'
        }
      }
    }
  },
  Subject: {                                // 7
    subject_key: {                          // 18
      attendance: {                         // 10
        week_key: {                         // 7
          date: 'string_length_10',
          session: 'string_length_10',
          students: {                       // 8
            student_id: {                   // 8
              status: 'string_length_5',
              time: 'string_length_27',
              timeIn: 'string_length_27',
              timeLate: 'string_length_27',
              timeOut: 'string_length_27'
            }
          }
        }
      },
      code: 'string_length_8',
      count: 'string_length_3',
      log: {                                 // 3
        attendance: {                        // 10
          firebase_key: {                    // 20 
            change: 'string_length_15',
            comment: 'string_length_200',
            date: 'string_length_25',
            professorID: 'string_length_100',
            student: 'string_length_8',
            time: 'string_length_25',
            week: 'string_length_7'
          }
        }
      },
      name: 'string_length_100',
      professors: {                          // 10 
        key: {                               // 1 
          name: 'string_length_60',
          photoUrl: 'string_length_100',
          professorID: 'string_length_100',
          timeIn: 'string_length_5',
          timeLate: 'string_length_5',
          timeOut: 'string_length_5'
        }
      },
      students: {                             // 8 
        student_id: 'string_length_60'
      },
      term: 'string_length_1',
      year: 'string_length_4'
    }
  }
}

// typeof (project_attendance)==='object'  the return is true

count_the_string = (obj) => {
  const result = {}
  Object.keys(obj).forEach(key => {
    result[key] = typeof (obj[key]) === 'object'
      ? count_the_string(obj[key])
      : key.length + parseInt(obj[key].split('_')[2])
  })
  return result
}

// console.log(count_the_string(project_attendance))
// console.log(count_the_string(project_attendance).Professor.firebase_key.subjects)
// console.log(count_the_string(project_attendance).Subject.subject_key.attendance)
// console.log(count_the_string(project_attendance).Subject.subject_key.attendance.week_key.students.student_id)
// console.log(count_the_string(project_attendance).Subject.subject_key.log)
// console.log(count_the_string(project_attendance).Subject.subject_key.professors)
// console.log(count_the_string(project_attendance).Subject.subject_key.students)

// output 
// project_attendance = {         // 18
//   Professor: {                 // 9
//     firebase_key: {            // 20 
//       name: 64,
//       phone: 15,
//       photoUrl: 108,
//       professorID: 111,
//       subjects: {              // 8
//         subject_key: {         // 18
//           name: 104
//         }
//       }
//     }
//   },
//   Subject: {                   // 7
//     subject_key: {             // 18 
//       attendance: {            // 10 
//         week_key: {            // 7 
//           date: 14,
//           session: 17,
//           students: {          // 8
//             student_id: {      // 8 
//               status: 11,
//               time: 31,
//               timeIn: 33,
//               timeLate: 35,
//               timeOut: 34
//             }
//           }
//         }
//       },
//       code: 12,
//       count: 8,
//       log: {                   // 3
//         attendance: {          // 10
//           firebase_key: {      // 20 
//             change: 21,
//             comment: 207,
//             date: 29,
//             professorID: 111,
//             student: 15,
//             time: 29,
//             week: 11
//           }
//         }
//       },
//       name: 104,
//       professors: {            // 10
//         key: {                 // 1
//           name: 64,
//           photoUrl: 108,
//           professorID: 111,
//           timeIn: 11,
//           timeLate: 13,
//           timeOut: 12
//         }
//       },
//       students: {              // 8 
//         student_id: 70
//       },
//       term: 5,
//       year: 8
//     }
//   }
// } 

sum_the_string = (obj) => {
  const result = {}
  Object.keys(obj).forEach(key => {
    if (typeof (obj[key]) === 'object') {
      result[key] = sum_the_string(obj[key])
    } else {
      result['sum'] = result['sum'] ? result['sum'] + obj[key] : obj[key]
    }
  })
  return result
}

// console.log(sum_the_string(count_the_string(project_attendance)))
// console.log(sum_the_string(count_the_string(project_attendance).Professor.firebase_key.subjects))
// console.log(sum_the_string(count_the_string(project_attendance).Subject.subject_key.attendance))
// console.log(sum_the_string(count_the_string(project_attendance).Subject.subject_key.attendance.week_key.students.student_id))
// console.log(sum_the_string(count_the_string(project_attendance).Subject.subject_key.log))
// console.log(sum_the_string(count_the_string(project_attendance).Subject.subject_key.professors))
// console.log(sum_the_string(count_the_string(project_attendance).Subject.subject_key.students))

// Out put
// project_attendance = {
//   Professor: {                          // 10 + (320 + 120 * s) * p
//     firebase_key: {                     // (320 + 120 * s) * p
//       sum: 298,
//       subjects: {                       // 120 * s 
//         subject_key: {
//           sum: 104
//         }
//       }
//     }
//   },
//   Subject: {                      // 7 + (200 + 320 * p + 70 * s + 450 * c + (50 + 150 * s1) * w) * st
//     subject_key: {                // (50 + 150 * s1) * w
//       attendance: {
//         week_key: {
//           sum: 31,
//           students: {             // 150 * s1 
//             student_id: {    
//               sum: 144
//             }
//           }
//         }
//       },
//       sum: 137,
//       log: {                      // 450 * c 
//         attendance: {
//           firebase_key: {
//             sum: 423
//           }
//         }
//       },
//       professors: {               // 320 * p
//         key: {
//           sum: 319
//         }
//       },
//       students: {                 //  70 * s 
//         sum: 70
//       }
//     }
//   }
// }

const subjectsOfProfessor = 20
const numOfProfessor = 10000

fn1 = (s, p) => 10 + (320 + 120 * s) * p

const professorsOfSubject = 5
const studentsInSubject = 350
const editInSubject = 100
const weekOfSubject = 20
const studentInClass = 350
const numOfSubject = 865

fn2 = (p, s, c, w, s1, st) => 7 + (200 + 320 * p + 70 * s + 450 * c + (50 + 150 * s1) * w) * st

console.log(1000000000 - (fn1(subjectsOfProfessor, numOfProfessor) + fn2(professorsOfSubject, studentsInSubject, editInSubject, weekOfSubject, studentInClass, numOfSubject)))       
