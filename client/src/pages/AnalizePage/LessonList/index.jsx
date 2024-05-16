import { useCallback, useEffect, useRef, useState } from "react"
import Wrapper from "../../../ui/Wrapper"

import Loading from "../../../ui/Loading"
import { requestRepeater } from "../../../utils/requestRepeater"
import Modal from "../../../ui/Modal"
import Button from "../../../ui/Button"
import { LessonsService } from "../../../api/LessonsService"
import LessonItem from "./LessonItem"
import FormGetLessonAnalize from "../../../forms/FormGetLessonAnalize"

const LessonList = ({ searchVal, ...props }) => {
    const getLessons = useCallback(async (search, page) => {
        return await LessonsService.searchLessons(search, page, 10)
    }, [])
    const [isActiveModal, setIsActiveModal] = useState(false)

    const handleAnalizeLesson = useCallback((lesson) => {
        setFocusedLesson(lesson)
        setIsActiveModal(true)
    }, [])


    const [focusedLesson, setFocusedLesson] = useState(null)
    const footerElemRef = useRef(null)
    const observerRef = useRef(null)

    const [page, setPage] = useState(1);
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isEnd, setIsEnd] = useState(false)
    useEffect(() => {
        let ignore = false
        setIsLoading(true)
        requestRepeater(async () => {
            return await getLessons(searchVal, page)
        }, 4).then((res) => {
            if (!ignore) {
                if (!res?.data?.length) {
                    setIsEnd(true)
                } else {
                    setLessons((prev) => [...prev, ...res.data])
                }

                setIsLoading(false)
            }
        }).catch((e) => {
            setIsLoading(false)
            setError(e)
        })
        return () => {
            ignore = true
        }
    }, [page, searchVal, getLessons])
    useEffect(() => {
        setLessons([]);
        setPage(1);
        setIsEnd(false)
    }, [searchVal]);
    useEffect(() => {
        if (isLoading || isEnd || error !== null) return
        observerRef.current = new IntersectionObserver((entries) => {
            const [entry] = entries
            if (entry.isIntersecting) {
                setPage((prev) => prev + 1)
            }
        }, {
            root: null,
            rootMargin: "40px",
            threshold: 1.0,
        })
        if (footerElemRef?.current) {
            observerRef.current.observe(footerElemRef.current)

        }
        return () => {

            observerRef.current.disconnect()

        }
    }, [isLoading, isEnd, error])

    return <Wrapper children_margin verticalMargin direaction="col">

        <Modal isActive={isActiveModal} setIsActive={setIsActiveModal}>
            {focusedLesson &&
                <FormGetLessonAnalize lesson={focusedLesson} />
            }
        </Modal>
        {lessons && lessons.map((lesson) => {
            return <LessonItem key={lesson.name} lesson={lesson} handleClick={handleAnalizeLesson} />
        })}
        {error && <Wrapper children_margin direaction="col" justify="center" align="center"><span>Ошибка: {error.toString()}</span><span>Попробуйте обновить страницу</span></Wrapper>}
        {isLoading && <Wrapper verticalMargin justify="center"> <Loading size="large" /></Wrapper>}
        <div ref={footerElemRef}></div>
    </Wrapper>
}
export default LessonList