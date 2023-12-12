const attendances = {
    'unknown': 0,
    'attended': 1,
    'absent': 2,
    'sick': 3,
    'order': 4
}
export const attendancesById = ['unknown', 'attended', 'absent', 'sick', 'order']
Object.freeze(attendances)
export const attendancesColor = {
    'unknown': '#FFFFFF',
    'attended': '#49e035',
    'absent': '#ff4d4d',
    'sick': '#fe8040',
    'order': '#2ab7ca'
}

export const attendancesRu = {
    'unknown': 'неизвестно',
    'attended': 'присутствовал',
    'absent': 'не был',
    'sick': 'болел',
    'order': 'распоряжение'
}
Object.freeze(attendancesRu)
export const attendancesShortRu = {
    'unknown': '',
    'attended': 'П',
    'absent': 'Н',
    'sick': 'Б',
    'order': 'Р'
}
Object.freeze(attendancesShortRu)
export default attendances