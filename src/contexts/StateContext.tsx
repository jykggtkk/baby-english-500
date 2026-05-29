import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, Sentence, LearningProgress } from '@types';

interface StateContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  updateProgress: (sentenceId: number, status: 'new' | 'learning' | 'mastered') => void;
  setTigerState: (state: 'idle' | 'happy' | 'sleepy' | 'excited' | 'learning') => void;
  updateDailyLimit: (limit: number) => void;
}

type Action =
  | { type: 'SET_CURRENT_SENTENCE'; payload: Sentence }
  | { type: 'UPDATE_PROGRESS'; payload: LearningProgress }
  | { type: 'SET_TIGER_STATE'; payload: AppState['tigerState'] }
  | { type: 'SET_LEARNING_STATUS'; payload: boolean }
  | { type: 'SET_LEARNING_STEP'; payload: AppState['currentStep'] }
  | { type: 'UPDATE_STICKER_COUNT'; payload: number }
  | { type: 'UPDATE_DAILY_LIMIT'; payload: number }
  | { type: 'RESET_APP' };

const initialState: AppState = {
  currentSentence: null,
  learningProgress: [],
  reviewSchedule: [],
  isLearning: false,
  currentStep: 'animation',
  tigerState: 'idle',
  stickerCount: 0,
  totalSentences: 500,
  masteredSentences: 0,
  dailyLimit: 15,
};

function stateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_CURRENT_SENTENCE':
      return { ...state, currentSentence: action.payload };

    case 'UPDATE_PROGRESS':
      const progress = action.payload;
      const isMastered = progress.status === 'mastered';
      const masteredCount = state.learningProgress.filter(
        p => p.status === 'mastered'
      ).length + (isMastered && !state.learningProgress.find(p => p.id === progress.id) ? 1 : 0);

      return {
        ...state,
        learningProgress: [...state.learningProgress, progress].filter(
          (p, index, arr) => arr.findIndex(item => item.id === p.id) === index
        ),
        masteredSentences: masteredCount,
      };

    case 'SET_TIGER_STATE':
      return { ...state, tigerState: action.payload };

    case 'SET_LEARNING_STATUS':
      return { ...state, isLearning: action.payload };

    case 'SET_LEARNING_STEP':
      return { ...state, currentStep: action.payload };

    case 'UPDATE_STICKER_COUNT':
      return { ...state, stickerCount: action.payload };

    case 'UPDATE_DAILY_LIMIT':
      return { ...state, dailyLimit: action.payload };

    case 'RESET_APP':
      return initialState;

    default:
      return state;
  }
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const updateProgress = (sentenceId: number, status: 'new' | 'learning' | 'mastered') => {
    const progress: LearningProgress = {
      id: Date.now(), // Simple ID generation
      sentence_id: sentenceId,
      status,
      learned_at: status === 'mastered' ? new Date() : undefined,
      created_at: new Date(),
    };

    dispatch({ type: 'UPDATE_PROGRESS', payload: progress });
  };

  const setTigerState = (tigerState: AppState['tigerState']) => {
    dispatch({ type: 'SET_TIGER_STATE', payload: tigerState });
  };

  const updateDailyLimit = (limit: number) => {
    dispatch({ type: 'UPDATE_DAILY_LIMIT', payload: limit });
  };

  return (
    <StateContext.Provider value={{
      state,
      dispatch,
      updateProgress,
      setTigerState,
      updateDailyLimit,
    }}>
      {children}
    </StateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};