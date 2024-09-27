"use strict";(self.webpackChunk_aedart_ion_monorepo=self.webpackChunk_aedart_ion_monorepo||[]).push([[5305],{9268:function(s,n,a){a.r(n),a.d(n,{comp:function(){return p},data:function(){return c}});var e=a(641);const t={class:"table-of-contents"},o={};var p=(0,a(6262).A)(o,[["render",function(s,n){const a=(0,e.g2)("router-link");return(0,e.uX)(),(0,e.CE)("div",null,[n[2]||(n[2]=(0,e.Lk)("h1",{id:"hooks",tabindex:"-1"},[(0,e.Lk)("a",{class:"header-anchor",href:"#hooks"},[(0,e.Lk)("span",null,"Hooks")])],-1)),n[3]||(n[3]=(0,e.Lk)("p",null,"Concerns offer a few hook methods. These can be used to perform advanced setup or initialisation logic.",-1)),(0,e.Lk)("nav",t,[(0,e.Lk)("ul",null,[(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#before-registration"},{default:(0,e.k6)((()=>n[0]||(n[0]=[(0,e.eW)("BEFORE Registration")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#after-registration"},{default:(0,e.k6)((()=>n[1]||(n[1]=[(0,e.eW)("AFTER Registration")]))),_:1})])])]),n[4]||(n[4]=(0,e.Fv)('<h2 id="before-registration" tabindex="-1"><a class="header-anchor" href="#before-registration"><span><code>BEFORE</code> Registration</span></a></h2><p>To perform pre-registration logic, use the static <code>BEFORE</code> method in your concern class. This hook method is invoked before the concern container and aliases are defined in the target class.</p><p>The method accepts the following arguments:</p><ul><li><code>target: UsesConcerns</code> - the target class (<em>class constructor!</em>).</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">BEFORE</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/contracts/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AbstractConcern <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> isSubclass <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@aedart/support/reflections&#39;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> JobHandler <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@acme/jobs&#39;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">RecordsJobs</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token keyword">static</span> <span class="token punctuation">[</span><span class="token constant">BEFORE</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token comment">// E.g. prevent this concern from being used by all kinds of targets...</span></span>\n<span class="line">        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isSubclass</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> JobHandler<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">&#39;RecordsJobs can only be used by JobHandler&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line">        <span class="token punctuation">}</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="after-registration" tabindex="-1"><a class="header-anchor" href="#after-registration"><span><code>AFTER</code> Registration</span></a></h2><p>To perform post-registration logic, use the static <code>AFTER</code> method in your concern class. This method is invoked after the concern container and aliases have been defined in target&#39;s prototype.</p><p>The method accepts the following arguments:</p><ul><li><code>target: UsesConcerns</code> - the target class (<em>class constructor!</em>).</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">AFTER</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/contracts/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AbstractConcern <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ApiConnection <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@acme/api&#39;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">RecordsJobs</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token keyword">static</span> <span class="token punctuation">[</span><span class="token constant">AFTER</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token parameter">target</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token comment">// E.g. init or setup static resources...</span></span>\n<span class="line">        ApiConnection<span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',10))])}]]);const c=JSON.parse('{"path":"/archive/current/packages/support/concerns/hooks.html","title":"Hooks","lang":"en-GB","frontmatter":{"title":"Hooks","description":"How to use registration hooks","sidebarDepth":0},"headers":[{"level":2,"title":"BEFORE Registration","slug":"before-registration","link":"#before-registration","children":[]},{"level":2,"title":"AFTER Registration","slug":"after-registration","link":"#after-registration","children":[]}],"git":{"updatedTime":1709641376000,"contributors":[{"name":"alin","email":"alin@rspsystems.com","commits":1}]},"filePathRelative":"archive/current/packages/support/concerns/hooks.md","lastUpdatedDateFormat":"yyyy-MM-dd HH:mm:ss ZZZZ","lastUpdatedDateOptions":{}}')}}]);