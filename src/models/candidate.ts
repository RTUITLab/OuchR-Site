export enum CandidatesStages {
  'Application',
  'Testing',
  'Interview',
  'Offer',
}

export interface IStages {
  application: {
    date: string;
  };
  testing?: {
    startDate: string;
    task?: string;
    finishDate?: string;
  };
}

export class Stages {
  public application = {
    date: '',
  };
  public testing = {
    startDate: '',
    task: '',
    finishDate: '',
  };
}

export interface ICandidate {
  userId: string;
  name: string;
  birthday?: string;
  education?: string;
  workExperience?: string;
  availableInterships: null;
  pthotoUrl: null;
  resumeUrl: string;
  testResult: null;
  events: { date: string; stage: number }[];
  comment?: string;
  summary?: JSX.Element;
  date?: string;
  more?: JSX.Element;
  currentIntership: string;

  currentStage: CandidatesStages;
}

export class Candidate implements ICandidate {
  userId = '';
  name = '';
  birthday = '';
  education = '';
  worExperience = '';
  availableInterships = null;
  pthotoUrl = null;
  resumeUrl = '';
  testResult = null;
  events = [];
  currentIntership = '';

  currentStage = CandidatesStages.Application;
}
