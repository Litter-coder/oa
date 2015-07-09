package oa.junit.test;

import java.io.IOException;
import java.io.StringReader;
import java.util.Date;

import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.highlight.Highlighter;
import org.apache.lucene.search.highlight.InvalidTokenOffsetsException;
import org.apache.lucene.search.highlight.QueryScorer;
import org.apache.lucene.search.highlight.SimpleFragmenter;
import org.apache.lucene.search.highlight.SimpleHTMLFormatter;
import org.apache.lucene.util.Version;
import org.junit.Test;

public class TestLucene {

	@Test
	public void testHighlight() throws ParseException, IOException, InvalidTokenOffsetsException {
		String field = "content";
		String query = "\"中国\"";
		String content = "中国，四大文明古国之一，是一个以华夏文明为主体、以汉族为主体民族的统一多民族国家。境内56个民族统称为中华民族，龙是中华民族的象征";

		String head = "<font color = 'red'>";
		String tail = "</font>";
		int fragmentSize = 3;
		int maxNumFragment = 2;
		String separator = "...";

		SimpleHTMLFormatter formatter = new SimpleHTMLFormatter(head, tail);

		StandardAnalyzer analyzer = new StandardAnalyzer(Version.LUCENE_43);

		Query parse = new QueryParser(Version.LUCENE_43, field, analyzer).parse(query);

		Highlighter highlighter = new Highlighter(formatter, new QueryScorer(parse, field));

		highlighter.setTextFragmenter(new SimpleFragmenter(fragmentSize));

		String result = highlighter.getBestFragments(//
				analyzer.tokenStream(field, new StringReader(content)), //
				content, //
				maxNumFragment, //
				separator);

		System.out.println("result1:" + result);

		query = "古国";
		String result2 = content.replaceAll(query, "<font color = 'red'>" + query + "</font>");
		System.out.println("result2:" + result2);

		String result3 = replaceUtil(content, query, head, tail, fragmentSize, maxNumFragment, separator);
		System.out.println("result3:" + result3);
	}

	public String replaceUtil(String content, String query, String head, String tail, int fragmentSize, int maxNumFragment, String separator) {
		StringBuffer sb = new StringBuffer();

		if (fragmentSize < query.length()) {
			fragmentSize = query.length();
		}
		int cicle = 0;
		splitWord(cicle, content, query, head, tail, sb, fragmentSize, maxNumFragment, separator);

		return sb.toString();
	}

	private void splitWord(int circle, String content, String query, String head, String tail, StringBuffer sb, int fragmentSize, int maxNumFragment, String separator) {
		int first = content.indexOf(query);
		if (first >= 0) {
			if (circle == 0) {
				String prex = content.substring(0, first);
				int half = fragmentSize * 2 / 3;
				String sepString = prex.substring(0, half);
				sb.append(sepString);
				sepString = prex.substring(prex.length() - fragmentSize + half, prex.length());
				sb.append(separator + sepString);
			}
			sb.append(head + query + tail);
			content = content.substring(first + query.length());

			int next = content.indexOf(query);
			if (next >= 0) {// 下一个存在时
				String prex = content.substring(0, next);// 获取下一个内容前的数据用于分割缩略显示
				if (prex.length() > 0) {
					int plus = fragmentSize - query.length();// 剩余显示的字数
					if (plus >= prex.length()) {
						sb.append(prex);
					} else {// 多余时，截取前面，保留后面
						int half = plus * 2 / 3;
						String sepString = prex.substring(0, half);
						sb.append(sepString);
						sepString = prex.substring(prex.length() - plus + half, prex.length());
						sb.append(separator + sepString);
					}
				}
				circle++;
				if (circle >= maxNumFragment) {
					return;
				} else {
					splitWord(circle, content, query, head, tail, sb, fragmentSize, maxNumFragment, separator);
				}

			} else {
				int plus = fragmentSize - query.length();// 剩余显示的字数
				if (plus >= content.length()) {
					sb.append(content);
				} else {
					int half = plus * 2 / 3;
					String sepString = content.substring(0, half);
					sb.append(sepString);
					sepString = content.substring(content.length() - plus + half, content.length());
					sb.append(separator + sepString);
				}
				return;
			}
		}
	}

	public static void main(String[] args) {

		System.out.println(new Date().getTime() / 1000);
	}

}
