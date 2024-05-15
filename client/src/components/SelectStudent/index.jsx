import { useCallback } from "react"
import { useFetch } from "../../hooks/useFetch"
import Select from "react-select"
import UserService from "../../api/UserService"

const SelectStudent = ({ field, groupId, ...props }) => {
    const fetchStudents = useCallback(async () => {
        if (groupId) {
            return await UserService.getStudentsInGroup(groupId)
        }
        return Promise.resolve(null)
    }, [groupId])
    const [resp, isLoading] = useFetch(fetchStudents)
    return <Select
        placeholder={"Студент"}
        noOptionsMessage={() => "Студент не найден"}
        isLoading={isLoading}

        {...props}
        {...field}
        options={resp?.data?.Users?.map((f) => {
            const { User_info: ui } = f
            return ({
                value: f.id, label:
                    `${ui.last_name} ${ui.first_name[0]}. ${(ui.middle_name ? (ui?.middle_name[0] + '.') : '')}`
            })
        }) || []}
    />
}
export default SelectStudent