import { State, StateSnapshot, StateConfiguration } from "./state";
import { DaoMetadata, Proposal, Vote, Result} from "../ton-vote-client";

export class StateManager {
  private current: State;
	
  constructor(private config: StateConfiguration) {
    this.current = new State(this.config);
  }

  getCurrentSnapshot(): StateSnapshot {
    return this.current.getSnapshot();
  }
	
  insertDao(daoMetadata: DaoMetadata) {
    return this.current.insertDao(daoMetadata);
  }

  updateDao(daoMetadata: DaoMetadata) {
    return this.current.updateDao(daoMetadata);
  }

  insertNewProposal(proposal: Proposal) {
    return this.current.insertNewProposal(proposal);
  }

  submitVote(vote: Vote) {
    return this.current.submitVote(vote);
  }

	updateResult(result: Result, proposalId: string) {
    return this.current.updateResult(result, proposalId);
	}
	
}
