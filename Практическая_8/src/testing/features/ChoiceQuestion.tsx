import { Box, Checkbox, Radio, FormControlLabel, FormGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setChoiceAnswer } from './quizeSlice';
import { RootState } from '../../store';
import { tTasks } from '../quizData';

interface ChoiceQuestionProps {
    quizId: number;
    tasks: tTasks;
    taskOffset: number;
    multiSelect: boolean;
}

function ChoiceQuestion({ quizId, tasks, taskOffset, multiSelect }: ChoiceQuestionProps) {
    const dispatch = useDispatch();
    const choiceAnswers = useSelector((state: RootState) => state.lists.choiceAnswers);
    const showResults = useSelector((state: RootState) => state.lists.showResults);

    const getKey = () => `${quizId}-${taskOffset}`;

    const getSelected = (): string[] => choiceAnswers[getKey()] || [];

    const handleSingleChange = (value: string) => {
        dispatch(setChoiceAnswer({ key: getKey(), answers: [value] }));
    };

    const handleMultiChange = (value: string, checked: boolean) => {
        const current = getSelected();
        const next = checked ? [...current, value] : current.filter(v => v !== value);
        dispatch(setChoiceAnswer({ key: getKey(), answers: next }));
    };

    const selected = getSelected();

    const getOptionStyle = (task: { question: string; answer: string }) => {
        const option = task.question;
        if (!showResults) {
            return {
                border: selected.includes(option) ? '1px solid #1976d2' : '1px solid #e0e0e0',
                bgcolor: selected.includes(option) ? 'rgba(25,118,210,0.06)' : 'transparent',
            };
        }
        return { border: '1px solid #e0e0e0', bgcolor: 'transparent' };
    };

    return (
        <Box>
            <FormGroup>
                {tasks.map((task) => {
                    const option = task.question;
                    const optStyle = getOptionStyle(task);
                    const isSelected = selected.includes(option);

                    const control = multiSelect ? (
                        <Checkbox checked={isSelected} onChange={(e) => !showResults && handleMultiChange(option, e.target.checked)}/>
                    ) : (
                        <Radio checked={isSelected} onChange={() => !showResults && handleSingleChange(option)}/>
                    );

                    return (
                        <Box key={option} onClick={() => {
                                if (showResults) return;
                                if (multiSelect) handleMultiChange(option, !isSelected);
                                else handleSingleChange(option);
                             }}
                             sx={{...optStyle, borderRadius: '5px', mb: 1,
                                cursor: showResults ? 'default' : 'pointer', display: 'flex',
                                alignItems: 'center', px: 1, transition: 'all 0.2s',}}>
                            <FormControlLabel control={control} label={option}
                                              sx={{ m: 0, width: '100%', pointerEvents: 'none' }} />
                        </Box>
                    );
                })}
            </FormGroup>
        </Box>
    );
}

export default ChoiceQuestion;