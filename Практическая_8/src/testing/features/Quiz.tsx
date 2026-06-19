import { Box, Button, Container, Typography } from '@mui/material';
import { quiz } from '../quizData';
import Matching from './Matching';
import Sorting from './Sorting';
import ChoiceQuestion from './ChoiceQuestion';

import { useDispatch, useSelector } from 'react-redux';
import { resetList, setShowResults, resetChoiceAnswers } from './quizeSlice';
import { RootState } from '../../store';

function Quiz() {
    const dispatch = useDispatch();
    const lists = useSelector((state: RootState) => state.lists.lists);
    const choiceAnswers = useSelector((state: RootState) => state.lists.choiceAnswers);
    const showResults = useSelector((state: RootState) => state.lists.showResults);

    const handleCheck = () => {
        dispatch(setShowResults(true));
    };

    const handleReset = () => {
        dispatch(setShowResults(false));
        dispatch(resetChoiceAnswers());
        quiz.forEach((item, index) => {
            if (item.type === 'S') {
                const items = item.tasks.map((t) => t.question);
                const shuffled = [...items].sort(() => Math.random() - 0.5);
                dispatch(resetList({ index, items: shuffled }));
            } else {
                const items = item.tasks.map((t) => t.answer);
                const shuffled = [...items].sort(() => Math.random() - 0.5);
                dispatch(resetList({ index, items: shuffled }));
            }
        });
    };

    const getScore = (item: typeof quiz[number], index: number) => {
        const userAnswers = lists[index] || [];
        
        if (item.type === 'C' || item.type === 'MC') {
            const key = `${item.id}-0`;
            const selected = choiceAnswers[key] || [];
            const correctAnswers = item.tasks.filter(t => t.answer === "1").map(t => t.question);
            
            if (selected.length === 0) return 0;
            
            const allCorrectSelected = correctAnswers.every(c => selected.includes(c));
            const noWrongSelected = selected.every(s => {
                const task = item.tasks.find(t => t.question === s);
                return task && task.answer === "1";
            });
            
            return (allCorrectSelected && noWrongSelected) ? 1 : 0;
        }
        
        if (item.type === 'M') {
            const correctAnswers = item.tasks.map((t) => t.answer);
            return userAnswers.filter((ans, i) => ans === correctAnswers[i]).length;
        }
        
        if (item.type === 'S') {
            const correctItems = [...item.tasks]
                .sort((a, b) => parseInt(a.answer) - parseInt(b.answer))
                .map(t => t.question);
            return userAnswers.filter((item, i) => item === correctItems[i]).length;
        }
        
        return 0;
    };

    const getTotal = (item: typeof quiz[number]) => {
        return (item.type === 'C' || item.type === 'MC') ? 1 : item.tasks.length;
    };

    const renderQuestion = (item: typeof quiz[number], index: number) => {
        if (item.type === 'M') {
            return <Matching index={index} tasks={item.tasks} />;
        }
        if (item.type === 'S') {
            return <Sorting index={index} tasks={item.tasks} />;
        }
        if (item.type === 'C' || item.type === 'MC') {
            return <ChoiceQuestion quizId={item.id} tasks={item.tasks} taskOffset={0} multiSelect={item.type === 'MC'} />;
        }
        return null;
    };

    return (
        <Container maxWidth='md'>
            {quiz.map((item, index) => (
                <Box key={item.id} component='section' sx={{ m: 2, p: 2 }}>
                    <Typography variant='h5' gutterBottom>
                        {index + 1}. {item.title}
                    </Typography>
                    {renderQuestion(item, index)}
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
                        const score = getScore(item, index);
                        const total = getTotal(item);
                        const resultText = score === total
                            ? 'Все ответы верные.'
                            : `Верных ответов: ${score} из ${total}.`;
                        return (
                            <Typography key={item.id} variant='body1' sx={{ mb: 1 }} align='center'>
                                Задание {index + 1}. {resultText}
                            </Typography>
                        );
                    })}
                </Box>
            )}
        </Container>
    );
}

export default Quiz;