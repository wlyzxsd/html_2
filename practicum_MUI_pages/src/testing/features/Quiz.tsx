import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from '../quizData';
import Matching from '../features/Matching';

import { useDispatch, useSelector } from 'react-redux';
import { resetList, setShowResults } from './quizeSlice';
import { RootState } from '../../store';

function Quiz() {
    const dispatch = useDispatch();
    const lists = useSelector((state: RootState) => state.lists.lists);
    const showResults = useSelector((state: RootState) => state.lists.showResults);

    const handleCheck = () => {
        dispatch(setShowResults(true));
    };

    const handleReset = () => {
        dispatch(setShowResults(false));
        quiz.forEach((item, index) => {
            const shuffled = [...item.tasks.map((t) => t.answer)]
                                           .sort(() => Math.random() - 0.5);
            dispatch(resetList({ index, items: shuffled }));
        });
    };

    const getScore = (quizIndex: number) => {
        const userAnswers = lists[quizIndex] || [];
        const correctAnswers = quiz[quizIndex].tasks.map((t) => t.answer);
        return userAnswers.filter((ans, i) => ans === correctAnswers[i]).length;
    };

        const getTotalScore = () => {
        let total = 0;
        for (let i = 0; i < quiz.length; i++) {
            total = total + getScore(i);
        }
        return total;
    };

    const getTotalQuestions = () => {
        let total = 0;
        for (let i = 0; i < quiz.length; i++) {
            total = total + quiz[i].tasks.length;
        }
        return total;
    };

    return (
        <Container maxWidth='md'>
            {quiz.map((item, index) => (
                <Box key={item.id} component='section' sx={{ m: 2, p: 2 }}>
                    <Typography variant='h5' gutterBottom>
                        {index + 1}. {item.title}
                    </Typography>
                    <Matching index={index} tasks={item.tasks} />
                </Box>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button variant='contained' onClick={handleCheck}>Проверить</Button>
                <Button variant='contained' onClick={handleReset}>Начать снова</Button>
            </Box>

            {showResults && (
                <Box component='section' sx={{ m: 2, p: 2 }}>
                    <Typography variant='h5' gutterBottom align='center'>Результаты теста</Typography>

                    {quiz.map((item, index) => {
                        const score = getScore(index);
                        const total = item.tasks.length;
                        const resultText = score === total
                            ? 'Все ответы верные.'
                            : `Верных ответов: ${score} из ${total}.`;
                        return (
                            <Typography key={item.id} variant='body1' sx={{ mb: 1 }} align='center'>
                                Задание {index + 1}. {resultText}
                            </Typography>
                        );
                    })}

                    <Typography variant='body1' sx={{ mt: 2}} align='center'>
                        Всего верных ответов: {getTotalScore()}.
                    </Typography>
                </Box>
            )}
        </Container>
    );
}

export default Quiz;