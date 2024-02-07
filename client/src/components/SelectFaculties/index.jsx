import Select from 'react-select'
import { FacultyService } from '../../api/FacultyService'
import { useCallback } from 'react'
import { useFetch } from '../../hooks/useFetch'
const SelectFaculties = ({ field, ...props }) => {
    const fetchFaculties = useCallback(async () => {
        return await FacultyService.getFaculties()
    }, [])
    const [resp, isLoading] = useFetch(fetchFaculties)
    return <Select
        placeholder={"Факультет"}
        noOptionsMessage={() => "Факультетов не найдено"}
        isLoading={isLoading}
        {...props}
        {...field}
        options={resp?.data.map((f) => ({ value: f.id, label: f.name })) || []}
    />
}
export default SelectFaculties