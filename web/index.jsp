<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/page/public/common.jsp"%>
<%
	if (request.getSession(false) != null) {
		String username = (String) pageContext.getAttribute("loginUsername");
		if (username != null && !"".equals(username)) {
			response.sendRedirect(request.getContextPath() + "/index/loadMenu.do");
		}else{
			response.sendRedirect(request.getContextPath() + "/login.jsp");
		}
	} else {
		response.sendRedirect(request.getContextPath() + "/login.jsp");
	}
	//request.getRequestDispatcher("/index.do").forward(request,response);
%>
