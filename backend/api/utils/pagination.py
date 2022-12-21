from rest_framework.pagination import CursorPagination


class CurPagination(CursorPagination):
    cursor_query_param = "cursor" # 游标请求参数，相当于page页数，但该数据是加密的，来自于上次分页返回
    page_size = 2 # 默认每页显示的
    ordering = "-id" # 排序 根据id倒序
    max_page_size = 10 # 每页显示的最大条数