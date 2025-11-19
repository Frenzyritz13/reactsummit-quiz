// Import types for jest and JSX for TypeScript
import type {} from 'jest';
import type { JSX } from 'react';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// Import Home after all mocks are set up
import Home from './page';

// Mock child components
jest.mock('@/components/landing-page', () => ({
    LandingPage: ({ onStartQuiz }: { onStartQuiz: () => void }) => (
        <button onClick={onStartQuiz}>Start Quiz</button>
    ),
}));
jest.mock('@/components/quiz-question', () => {
    const QuizQuestion = ({
        onAnswer,
        isLastQuestion,
    }: {
        onAnswer: (a: string) => void;
        isLastQuestion: boolean;
    }) => (
        <div>
            <button onClick={() => onAnswer('mockArchetype')}>Answer</button>
            {isLastQuestion && <span>Last Question</span>}
        </div>
    );
    return {
        __esModule: true,
        QuizQuestion,
        default: QuizQuestion,
    };
});
jest.mock('@/components/email-signup', () => ({
    EmailSignup: ({
        onComplete,
        onSkip,
    }: {
        onComplete: () => void;
        onSkip: () => void;
    }) => (
        <div>
            <button onClick={onComplete}>Complete Signup</button>
            <button onClick={onSkip}>Skip Signup</button>
        </div>
    ),
}));
jest.mock('@/components/quiz-results', () => {
    const QuizResults = ({ onRetakeQuiz }: { onRetakeQuiz: () => void }) => (
        <button onClick={onRetakeQuiz}>Retake Quiz</button>
    );
    return {
        __esModule: true,
        QuizResults,
        default: QuizResults,
    };
});
jest.mock('sonner', () => ({
    Toaster: () => <div data-testid="toaster" />,
}));

// Mock quiz data and logic
const mockQuestions = [
    { id: 1, text: 'Q1' },
    { id: 2, text: 'Q2' },
];
jest.mock('@/data/quiz-data', () => {
    return {
        __esModule: true,
        questions: [
            { id: 1, text: 'Q1' },
            { id: 2, text: 'Q2' },
        ],
        default: [
            { id: 1, text: 'Q1' },
            { id: 2, text: 'Q2' },
        ],
    };
});
const calculateResultMock = jest.fn(() => ({ archetype: 'mock', description: 'desc' }));
jest.mock('@/utils/quiz-logic', () => ({
    __esModule: true,
    calculateResult: calculateResultMock,
    default: { calculateResult: calculateResultMock },
}));

describe('Home', () => {
    it('renders LandingPage initially', () => {
        render(<Home />);
        expect(screen.getByText('Start Quiz')).toBeInTheDocument();
    });

    it('starts quiz when Start Quiz is clicked', () => {
        render(<Home />);
        fireEvent.click(screen.getByText('Start Quiz'));
        expect(screen.getByText('Answer')).toBeInTheDocument();
    });

    it('progresses through quiz questions and shows EmailSignup after last question', async () => {
        render(<Home />);
        fireEvent.click(screen.getByText('Start Quiz'));

        // First question
        fireEvent.click(screen.getByText('Answer'));
        // Second (last) question
        fireEvent.click(screen.getByText('Answer'));

        await waitFor(() => {
            expect(screen.getByText('Complete Signup')).toBeInTheDocument();
            expect(screen.getByText('Skip Signup')).toBeInTheDocument();
        });
    });

    it('shows QuizResults after completing signup', async () => {
        render(<Home />);
        fireEvent.click(screen.getByText('Start Quiz'));
        fireEvent.click(screen.getByText('Answer'));
        fireEvent.click(screen.getByText('Answer'));

        await waitFor(() => screen.getByText('Complete Signup'));
        fireEvent.click(screen.getByText('Complete Signup'));

        await waitFor(() => {
            expect(screen.getByText('Retake Quiz')).toBeInTheDocument();
        });
    });

    it('shows QuizResults after skipping signup', async () => {
        render(<Home />);
        fireEvent.click(screen.getByText('Start Quiz'));
        fireEvent.click(screen.getByText('Answer'));
        fireEvent.click(screen.getByText('Answer'));

        await waitFor(() => screen.getByText('Skip Signup'));
        fireEvent.click(screen.getByText('Skip Signup'));

        await waitFor(() => {
            expect(screen.getByText('Retake Quiz')).toBeInTheDocument();
        });
    });

    it('retakes quiz and returns to landing page', async () => {
        render(<Home />);
        fireEvent.click(screen.getByText('Start Quiz'));
        fireEvent.click(screen.getByText('Answer'));
        fireEvent.click(screen.getByText('Answer'));

        await waitFor(() => screen.getByText('Complete Signup'));
        fireEvent.click(screen.getByText('Complete Signup'));

        await waitFor(() => screen.getByText('Retake Quiz'));
        fireEvent.click(screen.getByText('Retake Quiz'));

        expect(screen.getByText('Start Quiz')).toBeInTheDocument();
    });

    it('renders Toaster', () => {
        render(<Home />);
        expect(screen.getByTestId('toaster')).toBeInTheDocument();
    });
});