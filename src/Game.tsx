import { Card, IconButton, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./Store/questions"
import { type Question as QuestionType } from './Store/types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Question = ({ info }: { info: QuestionType }) => {

    return (
        <Card variant="outlined">
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={shadesOfPurple} >
                {info.code}
            </SyntaxHighlighter>
        </Card>
    )
}


export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)

    const questionInfo = questions[currentQuestion]
    console.log('la currentInfo', questionInfo)

    return (
        <>
            <Question info={questionInfo} />
        </>
    )
}