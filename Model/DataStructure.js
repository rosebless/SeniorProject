var dataBaseStore = {
    subjects: { // year-term-id-section
        year: '',
        term: '',
        id: '',
        section: '', 
        name: '',
        logo: '',
        students: [] 
    }, 
    students: { // id 
        id: '', 
        name: '', 
    },
    teachers: { // id 
        id: '',
        position: '',
        subjects: []
    },
    attendaces: { // transectionId 
        subjectId: '',
        studentId: '',
        time: '',
    }
}