import { queryAll, queryById, updateBookStatus } from '@/services/book';
import { createContainer } from 'unstated-next';
import useQuery from '@/utils/hooks/useQuery';
import usePage from '@/utils/hooks/usePage';
import { Popconfirm } from 'antd';
import React from 'react';

export function useData() {
  const { data, query, setParam: setDataParam } = useQuery({}, {}, queryById);
  // 全部书籍
  const { list: allList, fetch: allFetch, pagination: allPagination } = usePage([], {}, queryAll);
  // 编辑中
  const {
    list: listEditor,
    fetch: fetchEditorList,
    pagination: editorPagination,
    set: setEditorList,
    setPagination: setEditorPagination,
  } = usePage([], { status: 1 }, queryAll);
  // 未发布新书
  const { list, set, fetch, pagination, setPagination } = usePage([], { status: 0 }, queryAll);
  // 已完结
  const {
    list: ownlist,
    set: setOwnList,
    fetch: fetchOwnList,
    pagination: ownPagination,
    setPagination: setOwnPagination,
  } = usePage([], { status: 2 }, queryAll);
  // 已下架
  const {
    list: downlist,
    fetch: fetchDownList,
    pagination: downPagination,
    set: setDownList,
    setPagination: setDownPagination,
  } = usePage([], { status: 3 }, queryAll);

  function init() {
    fetchEditorList();
    fetch();
    fetchDownList();
    fetchOwnList();
  }

  /**
   * 更新书籍状态
   * @param id
   * @param status
   */
  function updateStatus(raw) {
    return updateBookStatus(raw);
  }

  /**
   * 下架书籍
   * @param raw
   */
  function downBook(raw) {
    updateBookStatus({ ...raw, status: 3 }).then(() => {
      setEditorList(listEditor.filter(r => r !== raw));
      setEditorPagination({ ...editorPagination, total: editorPagination.total - 1 });
      setDownList([raw, ...downlist]);
      setDownPagination({ ...downPagination, total: downPagination.total + 1 });
    });
  }

  /**
   * 上架
   * @param raw
   */
  function upBook(raw) {
    updateBookStatus({ ...raw, status: 1 }).then(() => {
      setDownList(downlist.filter(r => r !== raw));
      setDownPagination({ ...downPagination, total: downPagination.total - 1 });
      setEditorList([raw, ...listEditor]);
      setEditorPagination({ ...editorPagination, total: editorPagination.total + 1 });
    });
  }

  /**
   * 发布新书
   * @param raw
   */
  function pushBook(raw) {
    updateBookStatus({ ...raw, status: 1 }).then(() => {
      set(list.filter(r => r !== raw));
      setPagination({ ...pagination, total: pagination.total - 1 });
      setEditorList([raw, ...downlist]);
      setEditorPagination({ ...editorPagination, total: editorPagination.total + 1 });
    });
  }

  /**
   * 完结
   * @param raw
   */
  function finishBook(raw) {
    updateBookStatus({ ...raw, status: 2 }).then(() => {
      set(listEditor.filter(r => r !== raw));
      setEditorPagination({ ...editorPagination, total: editorPagination.total - 1 });
      setOwnList([raw, ...ownlist]);
      setOwnPagination({ ...ownPagination, total: ownPagination.total + 1 });
    });
  }

  return {
    ownlist,
    list,
    listEditor,
    fetchOwnList,
    data,
    fetch,
    query,
    downlist,
    updateStatus,
    init,
    fetchDownList,
    fetchEditorList,
    setDataParam,
    editorPagination,
    ownPagination,
    downPagination,
    pagination,
    downBook,
    upBook,
    pushBook,
    finishBook,
  };
}

export default createContainer(useData);
