import { create } from 'zustand';

type VmState = {
  cache: any;
  CommitButton: any;
  ethersContext: any;
  EthersProvider: any;
  Widget: any;
  near: any;
  stContext: any;
  StProvider: any;
};

type VmStore = VmState & {
  set: (update: VmState) => void;
};

export const useVmStore = create<VmStore>((set) => ({
  cache: null,
  CommitButton: null,
  stContext: null,
  StProvider: null,
  ethersContext: null,
  EthersProvider: null,
  Widget: null,
  near: null,
  set: (params) => set(() => ({ ...params })),
}));
