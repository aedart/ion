"use strict";(self.webpackChunk_aedart_ion_monorepo=self.webpackChunk_aedart_ion_monorepo||[]).push([[691],{8047:function(n,s,a){a.r(s),a.d(s,{comp:function(){return t},data:function(){return l}});var e=a(641);const p={};var t=(0,a(6262).A)(p,[["render",function(n,s){return(0,e.uX)(),(0,e.CE)("div",null,s[0]||(s[0]=[(0,e.Fv)('<h1 id="isconcatspreadable" tabindex="-1"><a class="header-anchor" href="#isconcatspreadable"><span><code>isConcatSpreadable</code></span></a></h1><p>Determines if object contains the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols" target="_blank" rel="noopener noreferrer">well-known</a> symbol <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable" target="_blank" rel="noopener noreferrer"><code>Symbol.isConcatSpreadable</code></a>.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> isConcatSpreadable <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@aedart/support/arrays&#39;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token function">isConcatSpreadable</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span></span>\n<span class="line"><span class="token function">isConcatSpreadable</span><span class="token punctuation">(</span><span class="token punctuation">[</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span></span>\n<span class="line"><span class="token function">isConcatSpreadable</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span></span>\n<span class="line"></span>\n<span class="line"><span class="token comment">// -------------------------------------------------------------------------</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span> <span class="token punctuation">]</span><span class="token punctuation">;</span></span>\n<span class="line">arr<span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>isConcatSpreadable<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token function">isConcatSpreadable</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span></span>\n<span class="line"></span>\n<span class="line"><span class="token comment">// -------------------------------------------------------------------------</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>isConcatSpreadable<span class="token punctuation">]</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token comment">// NOTE: length should be present, if Symbol.isConcatSpreadable</span></span>\n<span class="line">    <span class="token comment">// set to `true` However, isConcatSpreadable() does not check</span></span>\n<span class="line">    <span class="token comment">// if `length` is set!</span></span>\n<span class="line">    <span class="token literal-property property">length</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span></span>\n<span class="line">    <span class="token number">0</span><span class="token operator">:</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span></span>\n<span class="line">    <span class="token number">1</span><span class="token operator">:</span> <span class="token string">&#39;b&#39;</span><span class="token punctuation">,</span></span>\n<span class="line">    <span class="token number">2</span><span class="token operator">:</span> <span class="token string">&#39;c&#39;</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token function">isConcatSpreadable</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span></span>\n<span class="line"></span>\n<span class="line"><span class="token comment">// ------------------------------------------------------------------------- </span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>isConcatSpreadable<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"><span class="token function">isConcatSpreadable</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span></span>\n<span class="line"><span class="token function">isConcatSpreadable</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">B</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',3)]))}]]);const l=JSON.parse('{"path":"/archive/current/packages/support/arrays/isConcatSpreadable.html","title":"Is Concat Spreadable","lang":"en-GB","frontmatter":{"title":"Is Concat Spreadable","description":"Determine if object is concat spreadable.","sidebarDepth":0},"headers":[],"git":{"updatedTime":1709288721000,"contributors":[{"name":"alin","email":"alin@rspsystems.com","commits":1}]},"filePathRelative":"archive/current/packages/support/arrays/isConcatSpreadable.md","lastUpdatedDateFormat":"yyyy-MM-dd HH:mm:ss ZZZZ","lastUpdatedDateOptions":{}}')}}]);