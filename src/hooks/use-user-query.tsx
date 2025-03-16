import { z } from "zod";
import debounce from "lodash.debounce";
import { create } from "zustand";
import { apiFetchRequest, queryClient } from "./base-fetch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
  following_url: string;
  gists_url: string;
  starred_url: string;
  events_url: string;
  site_admin: boolean;
}
interface GetGithubUserPayload {
  params: {
    q: string;
  };
}
export async function getGithubUser(
  payload: GetGithubUserPayload,
): Promise<GithubUser[]> {
  const { data, error } = await apiFetchRequest<{ items: GithubUser[] }>({
    url: "/search/users",
    params: { ...payload.params, per_page: "5" },
    method: "GET",
  });
  if (error || !data?.items) {
    return [];
  }
  return data?.items || [];
}
export const defaultValue = {
  search: "",
};

export interface GithubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  created_at: string;
  updated_at: string;
  git_url: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
}
export async function getUserRepo(owner: string) {
  const { data, error } = await apiFetchRequest<GithubRepo[]>({
    url: `/users/${owner}/repos`,
    params: { q: "", per_page: "100" },
    method: "GET",
  });
  if (error || !data) {
    return [];
  }
  return data || [];
}
export const searchSchema = z.object({
  search: z.string(),
});
export enum ActionType {
  None = "",
  GET_USER = "GET_USER",
  GET_USER_REPO = "GET_USER_REPO",
}
interface userState {
  isLoading: boolean;
  actionType: ActionType;
  listUser: GithubUser[];
  retry: number;
  activeUser: string;

  dataUserByOwnerName: Record<
    string,
    { profile: GithubUser; repo: GithubRepo[] }
  >;
}

interface userAction {
  setUser(data: GithubUser[]): void;
  setLoading(isLoading: boolean): void;
  setRetry(): void;
  setActionType(type: string): void;
  setActiveUser(id: string): void;
  setUserData(profile: GithubUser, repo: GithubRepo[]): void;
}
export const useUserStore = create<userState & userAction>((set) => ({
  isLoading: false,
  listUser: [],
  retry: 0,
  activeUser: "",
  actionType: ActionType.None,
  dataUserByOwnerName: {},

  setUser: (data) => {
    set({ listUser: data });
  },
  setLoading: (isLoading) => {
    set({ isLoading });
  },
  setRetry: () => {
    set((state) => ({ retry: state.retry + 1 }));
  },
  setActionType(type: ActionType) {
    set(() => ({ actionType: type }));
  },
  setUserData(profile, repo) {
    set((state) => ({
      dataUserByOwnerName: {
        ...state.dataUserByOwnerName,
        [profile.login]: {
          profile,
          repo: repo.length
            ? repo
            : state.dataUserByOwnerName?.[profile.login]?.repo || [],
        },
      },
    }));
  },
  setActiveUser(id: string) {
    set(() => ({ activeUser: id }));
  },
}));

export const useSearchGithubUser = () => {
  const {
    listUser,
    setUser,
    setActionType,
    actionType,
    setRetry,
    retry,
    activeUser,
    setActiveUser,
    dataUserByOwnerName,
    setUserData,
  } = useUserStore();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: defaultValue,
  });

  const handleSubmit = async (val: z.infer<typeof searchSchema>) => {
    setActionType(ActionType.GET_USER);
    setRetry();
    const res = await queryClient.fetchQuery({
      queryKey: ["get-current-user"],
      queryFn: async () => getGithubUser({ params: { q: val.search } }),
    });
    if (!res.length) {
      form.setValue("search", "");
    }
    setUser(res);

    setActionType(ActionType.None);
  };
  const getRepo = async (user: GithubUser) => {
    setActionType(ActionType.GET_USER_REPO);
    setUserData(user, []);
    setActiveUser(user.login);
    const res = await queryClient.fetchQuery({
      queryKey: ["get-repo", user.login],
      queryFn: async () => getUserRepo(user.login),
    });
    if (res.length) {
      setUserData(user, res);
    }
    setActionType(ActionType.None);
  };
  const user = useMemo(
    () => (activeUser ? dataUserByOwnerName[activeUser] : null),
    [activeUser, dataUserByOwnerName],
  );
  return {
    listUser,
    form,
    actionType,
    retry,
    user,
    onSubmit: form.handleSubmit(debounce(handleSubmit, 500)),
    getRepo,
    setActiveUser,
  };
};
