/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LearningObjective {
  id: string;
  text: string;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
}

export interface MaterialSection {
  id: string;
  title: string;
  content: string; // Markdown formatted content
  illustrationPrompt: string; // Prompt for visual assets related to this section
  flashcards: Flashcard[];
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "matching";
  question: string;
  options?: string[]; // Used for multiple-choice (e.g., A, B, C, D)
  correctAnswer: string; // Correct letter (e.g. "A", "B") or text ("Benar", "Salah"), or key for matching mapping
  explanation: string;
  matchingPairs?: { left: string; right: string }[]; // Used for matching questions
}

export interface InteractiveWidget {
  type: "sorting" | "balancer" | "timeline" | "flashcard-deck" | "quiz-game";
  title: string;
  description: string;
  data: any; // Dynamic records/parameters to configure the widget's gameplay
}

export interface LearningModule {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  description: string;
  learningObjectives: LearningObjective[];
  sections: MaterialSection[];
  quiz: QuizQuestion[];
  widget: InteractiveWidget;
  createdAt: string;
}
