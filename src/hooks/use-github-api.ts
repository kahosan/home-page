import { useCallback } from 'preact/hooks';

import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { Base64 } from 'js-base64';

import { useToasts } from './use-toasts';

import { fetcherIsSWRMutationWithToken, fetcherWithToken } from '@/lib/fetcher';

import type { GetContentError, GetContentResponse, GithubUser, updateDataError, updateDataResponse } from '@/types/github-api';
import type { ServiceData } from '@/types/service-card';

const githubUserInfo = atomWithStorage<GithubUser | null>(
  'github-user-info',
  {
    owner: '',
    repo: '',
    path: '',
    email: '',
    token: ''
  }
);

export const useGithubUserInfo = () => useAtom(githubUserInfo);

export const useGithubApi = () => {
  const [user] = useGithubUserInfo();
  const { setToast } = useToasts();

  const { data: getFileInfo } = useSWR<GetContentResponse, GetContentError>(
    user?.token && ['https://api.github.com/repos/kahosan/home-page/contents/services.json', user.token],
    fetcherWithToken,
    {
      onError(err) {
        setToast({
          text: `Github API 请求失败: ${err.message}`,
          type: 'error',
          delay: 3000
        });
      }
    }
  );

  const { trigger: updateData } = useSWRMutation<updateDataResponse, updateDataError>(
    [`https://api.github.com/repos/${user?.owner}/${user?.repo}/contents/services.json`, user?.token],
    fetcherIsSWRMutationWithToken,
    {
      onError(err) {
        setToast({
          text: `Github API 请求失败: ${err.message}`,
          type: 'error',
          delay: 3000
        });
      }
    }
  );

  const handleUpdateData = useCallback(async (data: ServiceData[]) => {
    if (getFileInfo?.sha) {
      updateData({
        message: 'chore: update services.json',
        committer: {
          name: user?.owner,
          email: user?.email
        },
        content: Base64.encode(JSON.stringify(data)),
        sha: getFileInfo?.sha
      }).then(() => {
        setToast({
          text: '更新数据成功',
          type: 'success',
          delay: 3000
        });
      });
    }
  }, [getFileInfo, setToast, updateData, user?.email, user?.owner]);

  return {
    handleUpdateData
  };
};
