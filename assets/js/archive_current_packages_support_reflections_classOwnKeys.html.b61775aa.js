"use strict";(self.webpackChunk_aedart_ion_monorepo=self.webpackChunk_aedart_ion_monorepo||[]).push([[3552],{2576:function(s,n,a){a.r(n),a.d(n,{comp:function(){return o},data:function(){return l}});var e=a(641);const t={id:"classownkeys",tabindex:"-1"},p={class:"header-anchor",href:"#classownkeys"},c={};var o=(0,a(6262).A)(c,[["render",function(s,n){const a=(0,e.g2)("Badge");return(0,e.uX)(),(0,e.CE)("div",null,[(0,e.Lk)("h1",t,[(0,e.Lk)("a",p,[(0,e.Lk)("span",null,[n[0]||(n[0]=(0,e.Lk)("code",null,"classOwnKeys",-1)),n[1]||(n[1]=(0,e.eW)()),(0,e.bF)(a,{type:"tip",text:"Available since v0.9",vertical:"middle"})])])]),n[2]||(n[2]=(0,e.Fv)('<p>Returns property keys that are defined target class&#39;s prototype. It accepts the following arguments:</p><ul><li><code>target: ConstructorOrAbstractConstructor</code> - The target class</li><li><code>recursive: boolean = false</code> - (<em>optional</em>) If <code>true</code>, then target&#39;s prototype chain is traversed and all property keys are returned.</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> classOwnKeys <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@aedart/support/reflections&#39;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token keyword">extends</span> <span class="token class-name">A</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token keyword">get</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token function">classOwnKeys</span><span class="token punctuation">(</span><span class="token constant">B</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ &#39;constructor&#39;, &#39;bar&#39; ]</span></span>\n<span class="line"><span class="token function">classOwnKeys</span><span class="token punctuation">(</span><span class="token constant">B</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ &#39;constructor&#39;, &#39;foo&#39;, &#39;bar&#39; ]</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">Caution</p><p><code>classOwnKeys()</code> throws <code>TypeError</code> if target does not have a <code>prototype</code> property.</p></div><h2 id="limitation" tabindex="-1"><a class="header-anchor" href="#limitation"><span>Limitation</span></a></h2><p>The <code>classOwnKeys()</code> function does not return static members of a target class.</p>',6))])}]]);const l=JSON.parse('{"path":"/archive/current/packages/support/reflections/classOwnKeys.html","title":"Class Own Keys","lang":"en-GB","frontmatter":{"title":"Class Own Keys","description":"Get property keys of target class.","sidebarDepth":0},"headers":[{"level":2,"title":"Limitation","slug":"limitation","link":"#limitation","children":[]}],"git":{"updatedTime":1709548506000,"contributors":[{"name":"alin","email":"alin@rspsystems.com","commits":1}]},"filePathRelative":"archive/current/packages/support/reflections/classOwnKeys.md","lastUpdatedDateFormat":"yyyy-MM-dd HH:mm:ss ZZZZ","lastUpdatedDateOptions":{}}')}}]);