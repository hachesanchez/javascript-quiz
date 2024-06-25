import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionsStore } from "./Store/questions"
import { type Question as QuestionType } from './Store/types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Question = ({ info }: { info: QuestionType }) => {

    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    const getBackgroundColor = (info: QuestionType, index: number) => {
        const { userSelectedAnswer, correctAnswer } = info
        // usuario no ha seleccionado nada todavía
        if (userSelectedAnswer == null) return 'transparent'
        // si ya selecciono pero la solución es incorrecta
        if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
        // si esta es la solución correcta
        if (index === correctAnswer) return 'green'
        // si esta es la selección del usuario pero no es correcta
        if (index === userSelectedAnswer) return 'red'
        // si no es ninguna de las anteriores
        return 'transparent'
    }



    return (

        <Card variant="outlined" sx={{ bgcolor: '#222', p: 2, textAlign: "left", marginTop: 4 }}>

            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language="javascript" style={shadesOfPurple} >
                {info.code}
            </SyntaxHighlighter>

            <List sx={{ bgcolor: '#333' }} disablePadding >
                {info.answers.map((answers, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                            onClick={createHandleClick(index)}
                            sx={{ backgroundColor: getBackgroundColor(info, index) }}
                            disabled={info.userSelectedAnswer != null}
                        >
                            <ListItemText primary={answers} sx={{ textAlign: 'center' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Card>
    )
}


export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)

    const questionInfo = questions[currentQuestion]


    return (
        <>
            <Question info={questionInfo} />
        </>
    )
}