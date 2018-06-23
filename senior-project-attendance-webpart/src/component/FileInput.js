import React from 'react'
import PropTypes from 'prop-types'
import XLSX from 'xlsx'
import firebase from '../config/firebase'

const mimeTypeRegexp = /^(application|audio|example|image|message|model|multipart|text|video)\/[a-z0-9\.\+\*-]+$/;
const extRegexp = /\.[a-z0-9]*$/;

class Files extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.onDrop = this.onDrop.bind(this)
    this.onDragEnter = this.onDragEnter.bind(this)
    this.onDragLeave = this.onDragLeave.bind(this)
    this.openFileChooser = this.openFileChooser.bind(this)

    this.id = 1

    this.state = {
      files: []
    }
  }

  // Add by SW 
  getTime = () => {
    var dateAll, date, month, year, TimeType, hour, minutes, seconds, fullTime;
    dateAll = new Date();
    date = dateAll.getDate();
    month = dateAll.getMonth() + 1;
    year = dateAll.getFullYear();
    hour = dateAll.getHours();
    if (hour <= 11) {
      TimeType = 'AM';
    } else {
      TimeType = 'PM';
    }

    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour == 0) {
      hour = 12;
    }

    minutes = dateAll.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }

    seconds = dateAll.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    fullTime = date.toString() + '/' + month.toString() + '/' + year.toString() + ' '
      + hour.toString() + ':' + minutes.toString() + ':' + seconds.toString() + ' ' + TimeType.toString();

    return fullTime
  }
  // readFile =  () => {
  //   const { files } = this.state
  //   files.forEach(async(file, index) => {
  //     const reader = new FileReader();
  //     reader.onload = async (e) => {
  //       console.log(' ----------------------------- reading ------------------------------ ')
  //       const dataTemp = e.target.result;
  //       const workbook = XLSX.read(dataTemp, { type: 'binary' });
  //       const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 'A' });
  //       const [id, subject, validation] = await this.getDataForFirebase(data)

  //       files[index].subjectID = id
  //       files[index].subject = subject
  //       files[index].validation = validation

  //       this.setState({ files })
  //     }
  //     await reader.readAsBinaryString(file);
  //   })
  // }
  // getDataForFirebase = async (data) => {
  //   const { professorKey, professorID, professorsName, photoUrl } = this.props.history.location.state
  //   let validation = data[2]['E'] && data[3]['E']
  //   // console.log(professorID, photoUrl)
  //   const term = data[2]['E'] ? data[2]['E'].trim().split(' ')[1] : ''
  //   const year = data[2]['E'] ? data[2]['E'].trim().split(' ')[3] : ''
  //   const e3split = data[3]['E'] ? data[3]['E'].trim().split('  ') : ['', '', '', '', '']
  //   const code = e3split[0]
  //   const name = e3split[1]
  //   const sec = e3split[2]
  //   let count = ''
  //   let major = ''
  //   if (e3split.length == 4) {
  //     count = e3split[3].split(' ')[1]
  //   }
  //   else {
  //     major = e3split[3]
  //     count = e3split[4].split(' ')[1] || ''
  //   }
  //   const [students, countToCheck] = this.readStudent(data)
  //   // if (countToCheck.toString() !== count) {
  //   //     validation = false
  //   // }
  //   let secForId = sec.split(' ')[1]
  //   const id = secForId === undefined
  //     ? [year, term, code].join('-')
  //     : [year, term, code, secForId].join('-')
  //   const professorsOld = await this.getOldProfessorInSubject(id)
  //   console.log('sadsdassda', professorKey)
  //   // const attendanceOld = await this.getOldAttendaceInSubject(id)
  //   const professors = professorsOld
  //   const indexP = professors.findIndex(professor => professor.professorID === professorID)
  //   console.log('indexP', indexP)
  //   if (indexP !== -1) {
  //     professors[indexP] = {
  //       professorID,
  //       name: professorsName,
  //       photoUrl
  //     }
  //   } else {
  //     professors.push({
  //       professorID,
  //       name: professorsName || '',
  //       photoUrl
  //     })
  //   }
  //   const subject = {
  //     subjectYear: year,
  //     subjectTerm: term,
  //     subjectID: code,
  //     name,
  //     count: countToCheck.toString(),
  //     students,
  //     // countToCheck,
  //     professors,
  //     // attendance: attendanceOld
  //   }
  //   validation = validation && this.checkForValidation(subject)
  //   return [id, subject, validation]
  // }
  // readStudent = (data, studentIDColumn = 'B', studentNameColumn = 'C') => {
  //   let students = {}
  //   let countToCheck = 0
  //   data.forEach((item, indexx) => {
  //     // if (5 < indexx % 41) {
  //     //     students[item['B'].trim()] = item['C'].trim()
  //     //     countToCheck++
  //     //     if (item['B'].trim().length !== 8) {
  //     //         validation = false
  //     //     }
  //     // } 
  //     if (item[studentIDColumn] && item[studentIDColumn].trim().length === 8 && !isNaN(parseInt(item[studentIDColumn].trim(), 10))) {
  //       students[item['B'].trim()] = item[studentNameColumn] ? item[studentNameColumn].trim() : ''
  //       countToCheck++
  //     }
  //   })
  //   return [students, countToCheck]
  // }
  // getOldProfessorInSubject = (key) => new Promise((resolve, reject) => {
  //   firebase.database().ref('/Subject').child(key).child('professors').once('value').then(snapshot => {
  //     // console.log(snapshot.val())
  //     resolve(snapshot.val() || []);
  //   })
  // })
  // checkForValidation = (subject) => {
  //   let validation = true
  //   if (subject.subjectYear && subject.subjectYear.length !== 4) {
  //     validation = false
  //   }
  //   if (subject.subjectTerm && subject.subjectTerm.length !== 1) {
  //     validation = false
  //   }
  //   if (subject.subjectID && subject.subjectID.length !== 8) {
  //     validation = false
  //   }
  //   return validation
  // }

  // End by SW 

  onDrop(event) {
    event.preventDefault()
    this.onDragLeave(event)

    // Collect added files, perform checking, cast pseudo-array to Array,
    // then return to method
    let filesAdded = event.dataTransfer ? event.dataTransfer.files : event.target.files

    // Multiple files dropped when not allowed
    if (this.props.multiple === false && filesAdded.length > 1) {
      filesAdded = [filesAdded[0]]
    }

    let files = []
    for (let i = 0; i < filesAdded.length; i++) {
      let file = filesAdded[i]

      // Assign file an id
      file.id = 'files-' + this.id++

      // Tell file it's own extension
      file.extension = this.fileExtension(file)

      // Tell file it's own readable size
      file.sizeReadable = this.fileSizeReadable(file.size)

      // Add by SW 
      file.addedTime = this.getTime()
      file.countSame = 0
      file.validation = true
      // End by SW 

      // Add preview, either image or file extension
      if (file.type && this.mimeTypeLeft(file.type) === 'image') {
        file.preview = {
          type: 'image',
          url: window.URL.createObjectURL(file)
        }
      } else {
        file.preview = {
          type: 'file'
        }
      }

      // Check for file max limit
      if (this.state.files.length + files.length >= this.props.maxFiles) {
        this.onError({
          code: 4,
          message: 'maximum file count reached'
        }, file)
        break
      }

      // If file is acceptable, push or replace
      if (this.fileTypeAcceptable(file) && this.fileSizeAcceptable(file)) {
        files.push(file)
      }
    }

    // this is Original code
    // this.setState({
    //   files: this.props.multiple === false
    //     ? files
    //     : [...this.state.files, ...files]
    // }, () => {
    //   this.props.onChange.call(this, this.state.files)
    // }) 

    // this is SW code  
    // delete duplicate method   
    const allFiles = [...this.state.files, ...files]
    let objFile = {}
    allFiles.forEach(file => {
      objFile[file.name] = file
    })
    const newFiles = Object.keys(objFile).map(key => (
      objFile[key]
    ))

    // update files method 
    this.setState({
      files: this.props.multiple === false
        ? files
        : newFiles
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })

  }

  onDragOver(event) {
    event.preventDefault()
    event.stopPropagation()
  }

  onDragEnter(event) {
    let el = this.dropzone
    el.className += ' ' + this.props.dropActiveClassName
  }

  onDragLeave(event) {
    let el = this.dropzone
    this.dropzone.className = el.className.replace(' ' + this.props.dropActiveClassName, '')
  }

  openFileChooser() {
    this.inputElement.value = null
    this.inputElement.click()
  }

  fileTypeAcceptable(file) {
    let accepts = this.props.accepts;
    if (!accepts) {
      return true
    }

    const result = accepts.some(accept => {
      if (file.type && accept.match(mimeTypeRegexp)) {
        let typeLeft = this.mimeTypeLeft(file.type)
        let typeRight = this.mimeTypeRight(file.type)
        let acceptLeft = accept.split('/')[0]
        let acceptRight = accept.split('/')[1]
        if (acceptLeft && acceptRight) {
          if (acceptLeft === typeLeft && acceptRight === '*') {
            return true
          }
          if (acceptLeft === typeLeft && acceptRight === typeRight) {
            return true
          }
        }
      } else if (file.extension && accept.match(extRegexp)) {
        const ext = accept.substr(1);
        return file.extension === ext
      }
      return false
    });

    if (!result) {
      this.onError({
        code: 1,
        message: file.name + ' is not a valid file type'
      }, file)
    }

    return result
  }

  fileSizeAcceptable(file) {
    if (file.size > this.props.maxFileSize) {
      this.onError({
        code: 2,
        message: file.name + ' is too large'
      }, file)
      return false
    } else if (file.size < this.props.minFileSize) {
      this.onError({
        code: 3,
        message: file.name + ' is too small'
      }, file)
      return false
    } else {
      return true
    }
  }

  mimeTypeLeft(mime) {
    return mime.split('/')[0]
  }

  mimeTypeRight(mime) {
    return mime.split('/')[1]
  }

  fileExtension(file) {
    let extensionSplit = file.name.split('.')
    if (extensionSplit.length > 1) {
      return extensionSplit[extensionSplit.length - 1]
    } else {
      return 'none'
    }
  }

  fileSizeReadable(size) {
    if (size >= 1000000000) {
      return Math.ceil(size / 1000000000) + 'GB'
    } else if (size >= 1000000) {
      return Math.ceil(size / 1000000) + 'MB'
    } else if (size >= 1000) {
      return Math.ceil(size / 1000) + 'kB'
    } else {
      return Math.ceil(size) + 'B'
    }
  }

  onError(error, file) {
    this.props.onError.call(this, error, file)
  }

  removeFile(fileToRemove) {
    this.setState({
      files: this.state.files.filter(file => file.id !== fileToRemove.id)
    }, () => {
      // this.props.onChange.call(this, this.state.files)
    })
  }

  removeFiles() {
    this.setState({
      files: []
    }, () => {
      this.props.onChange.call(this, this.state.files)
    })
  }

  render() {
    const inputAttributes = {
      type: 'file',
      accept: this.props.accepts ? this.props.accepts.join() : '',
      multiple: this.props.multiple,
      name: this.props.name,
      style: { display: 'none' },
      ref: (element) => {
        this.inputElement = element
      },
      onChange: this.onDrop
    }

    return (
      <div>
        <input
          {...inputAttributes}
        />
        <div
          className={this.props.className}
          onClick={
            this.props.clickable === true
              ? this.openFileChooser
              : null
          }
          onDrop={this.onDrop}
          onDragOver={this.onDragOver}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
          ref={dropzone => { this.dropzone = dropzone }}
          style={this.props.style}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

Files.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string.isRequired,
  dropActiveClassName: PropTypes.string,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  accepts: PropTypes.array,
  multiple: PropTypes.bool,
  maxFiles: PropTypes.number,
  maxFileSize: PropTypes.number,
  minFileSize: PropTypes.number,
  clickable: PropTypes.bool,
  name: PropTypes.string,
  style: PropTypes.object
}

Files.defaultProps = {
  onChange: function (files) {
    console.log(files)
  },
  onError: function (error, file) {
    console.log('error code ' + error.code + ': ' + error.message)
  },
  className: 'files-dropzone',
  dropActiveClassName: 'files-dropzone-active',
  accepts: null,
  multiple: true,
  maxFiles: Infinity,
  maxFileSize: Infinity,
  minFileSize: 0,
  name: 'file',
  clickable: true
}

export default Files
