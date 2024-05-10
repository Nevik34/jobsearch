import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";





type EagerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

type EagerUpdate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Update, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly noteId: string;
  readonly date: string;
  readonly notes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUpdate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Update, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly noteId: string;
  readonly date: string;
  readonly notes?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Update = LazyLoading extends LazyLoadingDisabled ? EagerUpdate : LazyUpdate

export declare const Update: (new (init: ModelInit<Update>) => Update) & {
  copyOf(source: Update, mutator: (draft: MutableModel<Update>) => MutableModel<Update> | void): Update;
}

type EagerListing = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Listing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly company: string;
  readonly title: string;
  readonly source?: string | null;
  readonly link?: string | null;
  readonly recruiter?: Recruiter | null;
  readonly status?: string | null;
  readonly notes?: string | null;
  readonly updates?: (Update | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly listingRecruiterId?: string | null;
}

type LazyListing = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Listing, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly company: string;
  readonly title: string;
  readonly source?: string | null;
  readonly link?: string | null;
  readonly recruiter: AsyncItem<Recruiter | undefined>;
  readonly status?: string | null;
  readonly notes?: string | null;
  readonly updates: AsyncCollection<Update>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly listingRecruiterId?: string | null;
}

export declare type Listing = LazyLoading extends LazyLoadingDisabled ? EagerListing : LazyListing

export declare const Listing: (new (init: ModelInit<Listing>) => Listing) & {
  copyOf(source: Listing, mutator: (draft: MutableModel<Listing>) => MutableModel<Listing> | void): Listing;
}

type EagerRecruiter = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recruiter, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly listingId: string;
  readonly first: string;
  readonly last: string;
  readonly email: string;
  readonly company?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecruiter = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Recruiter, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly listingId: string;
  readonly first: string;
  readonly last: string;
  readonly email: string;
  readonly company?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Recruiter = LazyLoading extends LazyLoadingDisabled ? EagerRecruiter : LazyRecruiter

export declare const Recruiter: (new (init: ModelInit<Recruiter>) => Recruiter) & {
  copyOf(source: Recruiter, mutator: (draft: MutableModel<Recruiter>) => MutableModel<Recruiter> | void): Recruiter;
}