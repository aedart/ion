"use strict";(self.webpackChunk_aedart_ion_monorepo=self.webpackChunk_aedart_ion_monorepo||[]).push([[9807],{6434:function(n,s,a){a.r(s),a.d(s,{comp:function(){return p},data:function(){return i}});var e=a(641);const t={};var p=(0,a(6262).A)(t,[["render",function(n,s){return(0,e.uX)(),(0,e.CE)("div",null,s[0]||(s[0]=[(0,e.Fv)('<h1 id="contextual-bindings" tabindex="-1"><a class="header-anchor" href="#contextual-bindings"><span>Contextual Bindings</span></a></h1><p>In situations when multiple classes make use of the same dependency, but you wish to inject a different component or value on some of those classes, then you can make use of &quot;context binding&quot;. The <code>when()</code> method allows you to specify (<em>overwrite</em>) the implementation to be resolved and injected, for a given target class.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">container<span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>ApiService<span class="token punctuation">)</span></span>\n<span class="line">        <span class="token punctuation">.</span><span class="token function">needs</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">)</span></span>\n<span class="line">        <span class="token punctuation">.</span><span class="token function">give</span><span class="token punctuation">(</span>CookieStorage<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line">container<span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span>UsersRepository<span class="token punctuation">,</span> BooksRepository<span class="token punctuation">)</span></span>\n<span class="line">        <span class="token punctuation">.</span><span class="token function">needs</span><span class="token punctuation">(</span><span class="token string">&#39;api_client&#39;</span><span class="token punctuation">)</span></span>\n<span class="line">        <span class="token punctuation">.</span><span class="token function">give</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>\n<span class="line">           <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AcmeApiClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> </span>\n<span class="line">        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To illustrate the usefulness of contextual binding a bit further, consider the following example:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">@<span class="token function">dependency</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token comment">// ...not shown...</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line">@<span class="token function">dependency</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">B</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token comment">// ...not shown...</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line">@<span class="token function">dependency</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">C</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token comment">// ...not shown...</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line">@<span class="token function">dependency</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">D</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token comment">// ...not shown...</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token comment">// Register &quot;default&quot; storage binding</span></span>\n<span class="line">container<span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">,</span> CookieStorage<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token comment">// Register contextual binding for C and D</span></span>\n<span class="line">container<span class="token punctuation">.</span><span class="token function">when</span><span class="token punctuation">(</span><span class="token constant">C</span><span class="token punctuation">,</span> <span class="token constant">D</span><span class="token punctuation">)</span></span>\n<span class="line">    <span class="token punctuation">.</span><span class="token function">needs</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">)</span></span>\n<span class="line">    <span class="token punctuation">.</span><span class="token function">give</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">CloudStorage</span><span class="token punctuation">(</span><span class="token string">&#39;s3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the above shown example, all classes define the same binding identifier (<em>&quot;storage&quot;</em>) as a dependency. By default, a &quot;storage&quot; binding is registered in the Service Container, which ensures that when the classes are resolved, a <code>CookieStorage</code> component instance is injected into each target class instance.</p><p>However, classes <code>C</code> and <code>D</code> require a different implementation, than the one offered by the &quot;storage&quot; binding. To achieve this, and without overwriting the default &quot;storage&quot; binding, a new contextual binding is registered that affects only classes <code>C</code> and <code>D</code>. When they are resolved, a different implementation of injected into the target classes.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">const</span> c <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token constant">C</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>storage<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// CloudStorage</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div>',8)]))}]]);const i=JSON.parse('{"path":"/archive/current/packages/container/contextual-bindings.html","title":"Contextual Bindings","lang":"en-GB","frontmatter":{"description":"Define Contextual Bindings","sidebarDepth":0},"headers":[],"git":{"updatedTime":1712583788000,"contributors":[{"name":"alin","email":"alin@rspsystems.com","commits":2}]},"filePathRelative":"archive/current/packages/container/contextual-bindings.md","lastUpdatedDateFormat":"yyyy-MM-dd HH:mm:ss ZZZZ","lastUpdatedDateOptions":{}}')}}]);