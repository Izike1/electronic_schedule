import { useCallback } from "react"
import { FacultyService } from "../../api/FacultyService"
import { useFetch } from "../../hooks/useFetch"
import Select from "react-select"

const SelectGroup = ({ field, facultyId, ...props }) => {
    const fetchFaculties = useCallback(async () => {
        if (facultyId) {
            return await FacultyService.getGroupsByFactulty(facultyId)
        }
        return Promise.resolve(null)
    }, [facultyId])
    const [resp, isLoading] = useFetch(fetchFaculties)
    return <Select
        placeholder={"Группа"}
        noOptionsMessage={() => "Групп не найдено"}
        isLoading={isLoading}

        {...props}
        {...field}
        options={resp?.data.map((f) => ({ value: f.id, label: f.name })) || []}
    />
}
export default SelectGroup