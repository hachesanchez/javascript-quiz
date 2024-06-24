import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionsStore } from "./Store/questions"
import { type Question as QuestionType } from './Store/types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { shadesOfPurple } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Question = ({ info }: { info: QuestionType }) => {

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
                        <ListItemButton>
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
    console.log('la currentInfo', questionInfo)

    return (
        <>
            <Question info={questionInfo} />
        </>
    )
}