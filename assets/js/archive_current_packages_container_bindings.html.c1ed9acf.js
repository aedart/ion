"use strict";(self.webpackChunk_aedart_ion_monorepo=self.webpackChunk_aedart_ion_monorepo||[]).push([[6905],{5439:function(n,s,a){a.r(s),a.d(s,{comp:function(){return c},data:function(){return p}});var e=a(641);const t={class:"table-of-contents"},i={};var c=(0,a(6262).A)(i,[["render",function(n,s){const a=(0,e.g2)("router-link"),i=(0,e.g2)("RouteLink");return(0,e.uX)(),(0,e.CE)("div",null,[s[25]||(s[25]=(0,e.Lk)("h1",{id:"bindings",tabindex:"-1"},[(0,e.Lk)("a",{class:"header-anchor",href:"#bindings"},[(0,e.Lk)("span",null,"Bindings")])],-1)),(0,e.Lk)("nav",t,[(0,e.Lk)("ul",null,[(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#basics"},{default:(0,e.k6)((()=>s[0]||(s[0]=[(0,e.eW)("Basics")]))),_:1}),(0,e.Lk)("ul",null,[(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#singletons"},{default:(0,e.k6)((()=>s[1]||(s[1]=[(0,e.eW)("Singletons")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#instances"},{default:(0,e.k6)((()=>s[2]||(s[2]=[(0,e.eW)("Instances")]))),_:1})])])]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#identifiers"},{default:(0,e.k6)((()=>s[3]||(s[3]=[(0,e.eW)("Identifiers")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#concrete-types"},{default:(0,e.k6)((()=>s[4]||(s[4]=[(0,e.eW)("concrete Types")]))),_:1}),(0,e.Lk)("ul",null,[(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#constructors"},{default:(0,e.k6)((()=>s[5]||(s[5]=[(0,e.eW)("Constructors")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#factory-callbacks"},{default:(0,e.k6)((()=>s[6]||(s[6]=[(0,e.eW)("Factory Callbacks")]))),_:1})])])]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#extend-bindings"},{default:(0,e.k6)((()=>s[7]||(s[7]=[(0,e.eW)("Extend Bindings")]))),_:1})])])]),s[26]||(s[26]=(0,e.Fv)('<h2 id="basics" tabindex="-1"><a class="header-anchor" href="#basics"><span>Basics</span></a></h2><p>The <code>bind()</code> method is used to register bindings in the Service Container. It accepts three arguments:</p><ul><li><code>identifier: Identifier</code> - (<em>see <a href="#identifiers">Identifiers</a></em>).</li><li><code>concrete: FactoryCallback | Constructor</code> - The value to be resolved from the container.</li><li><code>shared: boolean = false</code> - (<em>optional - see <a href="#singletons">Singletons</a></em>).</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> CookieStorage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@acme/storage&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token function">container</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">,</span> CookieStorage<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',4)),(0,e.Lk)("p",null,[s[9]||(s[9]=(0,e.eW)("When the binding is ")),(0,e.bF)(i,{to:"/archive/current/packages/container/resolving.html"},{default:(0,e.k6)((()=>s[8]||(s[8]=[(0,e.eW)("resolved")]))),_:1}),s[10]||(s[10]=(0,e.eW)(" from the Service Container, the ")),s[11]||(s[11]=(0,e.Lk)("code",null,"concrete",-1)),s[12]||(s[12]=(0,e.eW)(" value is returned. Either as a new class instance (")),s[13]||(s[13]=(0,e.Lk)("em",null,[(0,e.eW)("see "),(0,e.Lk)("a",{href:"#constructors"},"Constructors")],-1)),s[14]||(s[14]=(0,e.eW)("), or the value returned from a callback (")),s[15]||(s[15]=(0,e.Lk)("em",null,[(0,e.eW)("see "),(0,e.Lk)("a",{href:"#factory-callbacks"},"Factory Callbacks")],-1)),s[16]||(s[16]=(0,e.eW)(")."))]),s[27]||(s[27]=(0,e.Fv)('<p>You can also use <code>bindIf()</code> to register a binding. The method will <em>ONLY</em> register the binding, if one has not already been registered for the given identifier.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">container<span class="token punctuation">.</span><span class="token function">bindIf</span><span class="token punctuation">(</span><span class="token string">&#39;storage&#39;</span><span class="token punctuation">,</span> CookieStorage<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="singletons" tabindex="-1"><a class="header-anchor" href="#singletons"><span>Singletons</span></a></h3><p>If you wish to register a &quot;shared&quot; binding, use the <code>singleton()</code> method. It ensures that the binding is only resolved once. This means that the same object instance or value is returned, each time that it is requested resolved. Invoking the <code>singleton()</code> is the equivalent to invoking <code>bind()</code> with the <code>shared</code> argument set to <code>true</code>.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ApiClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@acme/api&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line">container<span class="token punctuation">.</span><span class="token function">singleton</span><span class="token punctuation">(</span><span class="token string">&#39;api_client&#39;</span><span class="token punctuation">,</span> ApiClient<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <code>singletonIf()</code> method is similar to <code>bindIf()</code>. It will only register a &quot;shared&quot; binding, if one has not already been registered.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">container<span class="token punctuation">.</span><span class="token function">singletonIf</span><span class="token punctuation">(</span><span class="token string">&#39;api_client&#39;</span><span class="token punctuation">,</span> ApiClient<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="instances" tabindex="-1"><a class="header-anchor" href="#instances"><span>Instances</span></a></h3><p>You can also register existing object instances in the Service Container. This is done via the <code>instance()</code> method. Whenever the binding is requested resolved, the same instance is returned each time.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> ApiClient <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@acme/api&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ApiClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line">container<span class="token punctuation">.</span><span class="token function">instance</span><span class="token punctuation">(</span><span class="token string">&#39;api_client&#39;</span><span class="token punctuation">,</span> client<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="identifiers" tabindex="-1"><a class="header-anchor" href="#identifiers"><span>Identifiers</span></a></h2><p>To ensure that the Service Container is able to resolve the correct object instances or values, the binding identifiers must be unique. The following types are supported as binding identifiers:</p><ul><li><code>string</code></li><li><code>symbol</code></li><li><code>number</code></li><li><code>object</code> (<em>not <code>null</code></em>)</li><li>Class Constructor</li><li>Callback</li></ul><div class="hint-container tip"><p class="hint-container-title">tip</p><p>To ensure that identifiers are truly unique, you <em>should</em> use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol" target="_blank" rel="noopener noreferrer">symbols</a> or <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes" target="_blank" rel="noopener noreferrer">class constructors</a> as binding identifiers.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// Somewhere in your application</span></span>\n<span class="line"><span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token constant">STORAGE</span> <span class="token operator">=</span> <span class="token function">Symbol</span><span class="token punctuation">(</span><span class="token string">&#39;app_storage&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> CookieStorage <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@acme/storage&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">STORAGE</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@acme/services&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token function">container</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token constant">STORAGE</span><span class="token punctuation">,</span> CookieStorage<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="concrete-types" tabindex="-1"><a class="header-anchor" href="#concrete-types"><span><code>concrete</code> Types</span></a></h2><p>The <code>concrete</code> argument for the <code>bind()</code>, <code>bindIf()</code>, <code>singleton()</code> and <code>singletonIf()</code> methods accepts the following types:</p><ul><li>Class constructor</li><li>&quot;Factory&quot; callback</li></ul><h3 id="constructors" tabindex="-1"><a class="header-anchor" href="#constructors"><span>Constructors</span></a></h3>',18)),(0,e.Lk)("p",null,[s[18]||(s[18]=(0,e.eW)("When registering a binding using a class constructor as the ")),s[19]||(s[19]=(0,e.Lk)("code",null,"concrete",-1)),s[20]||(s[20]=(0,e.eW)(" argument value, a new instance of that class is instantiated and returned, when requested ")),(0,e.bF)(i,{to:"/archive/current/packages/container/resolving.html"},{default:(0,e.k6)((()=>s[17]||(s[17]=[(0,e.eW)("resolved")]))),_:1}),s[21]||(s[21]=(0,e.eW)("."))]),s[28]||(s[28]=(0,e.Fv)('<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">TextRecorder</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token function">container</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&#39;recorder&#39;</span><span class="token punctuation">,</span> TextRecorder<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token comment">// Later in your application</span></span>\n<span class="line"><span class="token keyword">const</span> recorder <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token string">&#39;recorder&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>recorder <span class="token keyword">instanceof</span> <span class="token class-name">TextRecorder</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="factory-callbacks" tabindex="-1"><a class="header-anchor" href="#factory-callbacks"><span>Factory Callbacks</span></a></h3><p>If you need more advanced resolve logic, then you can specify a callback as the <code>concrete</code> argument value. When requested resolved, the callback is invoked and the Service Container instance is passed as argument to the callback. This allows you to perform other kinds of resolve logic.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">TextRecorder</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>config <span class="token operator">=</span> config<span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token function">container</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&#39;recorder&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">container</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token keyword">const</span> config <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token string">&#39;my_recorder_config&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">TextRecorder</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Although the above example shows an object instance being returned by the factory callback, any kind of value can be returned by the callback.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token function">container</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&#39;my_message&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token string">&#39;Hi there...&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token comment">// Later in your application</span></span>\n<span class="line"><span class="token keyword">const</span> msg <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token string">&#39;my_message&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Hi there...</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="arguments" tabindex="-1"><a class="header-anchor" href="#arguments"><span>Arguments</span></a></h4>',7)),(0,e.Lk)("p",null,[s[23]||(s[23]=(0,e.eW)("The factory callback is also provided with any arguments that are passed on to the ")),(0,e.bF)(i,{to:"/archive/current/packages/container/resolving.html#the-make-method"},{default:(0,e.k6)((()=>s[22]||(s[22]=[(0,e.Lk)("code",null,"make()",-1),(0,e.eW)(" method")]))),_:1}),s[24]||(s[24]=(0,e.eW)("."))]),s[29]||(s[29]=(0,e.Fv)('<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token function">container</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">container<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token comment">// Later in your application</span></span>\n<span class="line"><span class="token keyword">const</span> user <span class="token operator">=</span> container<span class="token punctuation">.</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;Maya&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line">console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Maya</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="extend-bindings" tabindex="-1"><a class="header-anchor" href="#extend-bindings"><span>Extend Bindings</span></a></h2><p>The <code>extend()</code> method can be used to decorate or configure object instances that have been resolved. The method accepts the following arguments:</p><ul><li><code>identifier: Identifier</code> - the target binding identifier.</li><li><code>callback: ExtendCallback</code> - callback that is responsible for modifying the resolved instance.</li></ul><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">container<span class="token punctuation">.</span><span class="token function">extend</span><span class="token punctuation">(</span><span class="token string">&#39;user&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">resolved<span class="token punctuation">,</span> container</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token keyword">return</span> <span class="token function">DecoratedUser</span><span class="token punctuation">(</span>resolved<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',5))])}]]);const p=JSON.parse('{"path":"/archive/current/packages/container/bindings.html","title":"Bindings","lang":"en-GB","frontmatter":{"description":"Service Container Bindings","sidebarDepth":0},"headers":[{"level":2,"title":"Basics","slug":"basics","link":"#basics","children":[{"level":3,"title":"Singletons","slug":"singletons","link":"#singletons","children":[]},{"level":3,"title":"Instances","slug":"instances","link":"#instances","children":[]}]},{"level":2,"title":"Identifiers","slug":"identifiers","link":"#identifiers","children":[]},{"level":2,"title":"concrete Types","slug":"concrete-types","link":"#concrete-types","children":[{"level":3,"title":"Constructors","slug":"constructors","link":"#constructors","children":[]},{"level":3,"title":"Factory Callbacks","slug":"factory-callbacks","link":"#factory-callbacks","children":[]}]},{"level":2,"title":"Extend Bindings","slug":"extend-bindings","link":"#extend-bindings","children":[]}],"git":{"updatedTime":1712579653000,"contributors":[{"name":"alin","email":"alin@rspsystems.com","commits":4}]},"filePathRelative":"archive/current/packages/container/bindings.md","lastUpdatedDateFormat":"yyyy-MM-dd HH:mm:ss ZZZZ","lastUpdatedDateOptions":{}}')}}]);