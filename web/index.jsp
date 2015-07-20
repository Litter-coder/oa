<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<%
	if ("${loginUsername}" != null && "${loginUsername}" != "") {

		response.sendRedirect(request.getContextPath() + "/index/loadMenu.do");
	} else {
		response.sendRedirect(request.getContextPath() + "/login.jsp");
	}
	//request.getRequestDispatcher("/index.do").forward(request,response);
%>
