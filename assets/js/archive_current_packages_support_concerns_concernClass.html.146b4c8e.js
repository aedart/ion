"use strict";(self.webpackChunk_aedart_ion_monorepo=self.webpackChunk_aedart_ion_monorepo||[]).push([[9925],{9720:function(n,s,a){a.r(s),a.d(s,{comp:function(){return l},data:function(){return i}});var e=a(641);const t={class:"table-of-contents"},p={class:"hint-container warning"},c={};var l=(0,a(6262).A)(c,[["render",function(n,s){const a=(0,e.g2)("router-link"),c=(0,e.g2)("RouteLink");return(0,e.uX)(),(0,e.CE)("div",null,[s[31]||(s[31]=(0,e.Lk)("h1",{id:"concern-class",tabindex:"-1"},[(0,e.Lk)("a",{class:"header-anchor",href:"#concern-class"},[(0,e.Lk)("span",null,"Concern Class")])],-1)),s[32]||(s[32]=(0,e.Lk)("p",null,"This chapter shows how to create a new concern class.",-1)),(0,e.Lk)("nav",t,[(0,e.Lk)("ul",null,[(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#inherit-from-abstractconcern"},{default:(0,e.k6)((()=>s[0]||(s[0]=[(0,e.eW)("Inherit from AbstractConcern")]))),_:1}),(0,e.Lk)("ul",null,[(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#private-members"},{default:(0,e.k6)((()=>s[1]||(s[1]=[(0,e.eW)("Private Members")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#static-members"},{default:(0,e.k6)((()=>s[2]||(s[2]=[(0,e.eW)("Static Members")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#transpilers"},{default:(0,e.k6)((()=>s[3]||(s[3]=[(0,e.eW)("Transpilers")]))),_:1})])])]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#customise-alias-members"},{default:(0,e.k6)((()=>s[4]||(s[4]=[(0,e.eW)('Customise "alias" members')]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#concern-owner-instance"},{default:(0,e.k6)((()=>s[5]||(s[5]=[(0,e.eW)("Concern Owner instance")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#constructor"},{default:(0,e.k6)((()=>s[6]||(s[6]=[(0,e.eW)("Constructor")]))),_:1})])])]),s[33]||(s[33]=(0,e.Fv)('<h2 id="inherit-from-abstractconcern" tabindex="-1"><a class="header-anchor" href="#inherit-from-abstractconcern"><span>Inherit from <code>AbstractConcern</code></span></a></h2><p>To create a new concern class, you can inherit from the <code>AbstractConcern</code> class.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AbstractConcern <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyConcern</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token keyword">get</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown */</span> <span class="token punctuation">}</span></span>\n<span class="line">    <span class="token keyword">set</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown */</span> <span class="token punctuation">}</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown */</span> <span class="token punctuation">}</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token punctuation">[</span><span class="token constant">MY_SYMBOL</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown */</span> <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',3)),(0,e.Lk)("p",null,[s[8]||(s[8]=(0,e.eW)("By default, all the public properties and methods (")),s[9]||(s[9]=(0,e.Lk)("em",null,"all property keys",-1)),s[10]||(s[10]=(0,e.eW)(") are made available for ")),(0,e.bF)(c,{to:"/archive/current/packages/support/concerns/aliases.html"},{default:(0,e.k6)((()=>s[7]||(s[7]=[(0,e.eW)('"aliasing"')]))),_:1}),s[11]||(s[11]=(0,e.eW)(" into a target class. To configure which members should be made available for aliasing, see ")),s[12]||(s[12]=(0,e.Lk)("a",{href:"#customise-alias-members"},'Customise "alias" members',-1)),s[13]||(s[13]=(0,e.eW)("."))]),s[34]||(s[34]=(0,e.Fv)('<h3 id="private-members" tabindex="-1"><a class="header-anchor" href="#private-members"><span>Private Members</span></a></h3><div class="hint-container warning"><p class="hint-container-title">Note</p><p>Private methods and properties are <strong>NEVER</strong> &quot;aliased&quot; into a target class.</p></div><h3 id="static-members" tabindex="-1"><a class="header-anchor" href="#static-members"><span>Static Members</span></a></h3><div class="hint-container warning"><p class="hint-container-title">Note</p><p>Static methods and properties are <strong>NOT</strong> &quot;aliased&quot; into target class.</p><p><em>At the moment, such a feature is not supported by the concerns&#39; mechanism.</em><em>This may become available in the future, but presently you SHOULD NOT rely on static members becoming available for aliasing.</em></p></div><h3 id="transpilers" tabindex="-1"><a class="header-anchor" href="#transpilers"><span>Transpilers</span></a></h3><div class="hint-container warning"><p class="hint-container-title">Caution</p><p>Some transpilers, like <a href="https://babeljs.io/" target="_blank" rel="noopener noreferrer">Babel</a> and <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">TypeScript</a>, automatically move property declarations into the class&#39; <code>constructor</code>. For instance:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span></span>\n<span class="line">    foo <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">;</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>becomes like the following, after it has been transpiled:</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>When this happens, properties cannot be &quot;aliased&quot;. The concern mechanisms relies on the class&#39; prototype for reading what properties are available. To overcome such an issue, you can use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get" target="_blank" rel="noopener noreferrer">getters</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set" target="_blank" rel="noopener noreferrer">setters</a> instead.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span></span>\n<span class="line">    #foo <span class="token operator">=</span> <span class="token string">&#39;bar&#39;</span><span class="token punctuation">;</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token keyword">get</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#foo</span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token keyword">set</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token parameter">v</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span>#foo <span class="token operator">=</span> v<span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="customise-alias-members" tabindex="-1"><a class="header-anchor" href="#customise-alias-members"><span>Customise &quot;alias&quot; members</span></a></h2>',7)),(0,e.Lk)("p",null,[s[15]||(s[15]=(0,e.eW)("If you wish to customise what properties and methods ")),s[16]||(s[16]=(0,e.Lk)("em",null,"should",-1)),s[17]||(s[17]=(0,e.eW)(" be available for ")),(0,e.bF)(c,{to:"/archive/current/packages/support/concerns/aliases.html"},{default:(0,e.k6)((()=>s[14]||(s[14]=[(0,e.eW)("aliasing")]))),_:1}),s[18]||(s[18]=(0,e.eW)(" when used by a target class, overwrite the static ")),s[19]||(s[19]=(0,e.Lk)("code",null,"PROVIDES",-1)),s[20]||(s[20]=(0,e.eW)(" method."))]),s[35]||(s[35]=(0,e.Fv)('<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> AbstractConcern<span class="token punctuation">,</span> <span class="token constant">PROVIDES</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">MyConcern</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token keyword">get</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown */</span> <span class="token punctuation">}</span></span>\n<span class="line">    <span class="token keyword">set</span> <span class="token function">message</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown */</span> <span class="token punctuation">}</span></span>\n<span class="line">    <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown */</span> <span class="token punctuation">}</span></span>\n<span class="line">    <span class="token punctuation">[</span><span class="token constant">MY_SYMBOL</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown */</span> <span class="token punctuation">}</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token keyword">static</span> <span class="token punctuation">[</span><span class="token constant">PROVIDES</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token comment">// Make &quot;message&quot; and &quot;foo&quot; available for aliasing...</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token punctuation">[</span></span>\n<span class="line">            <span class="token string">&#39;message&#39;</span><span class="token punctuation">,</span></span>\n<span class="line">            <span class="token string">&#39;foo&#39;</span></span>\n<span class="line">        <span class="token punctuation">]</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',1)),(0,e.Lk)("div",p,[s[26]||(s[26]=(0,e.Lk)("p",{class:"hint-container-title"},"warning",-1)),(0,e.Lk)("p",null,[s[22]||(s[22]=(0,e.eW)("Even if you do customise what properties and methods are available for aliasing, the returned property keys of the ")),s[23]||(s[23]=(0,e.Lk)("code",null,"PROVIDES",-1)),s[24]||(s[24]=(0,e.eW)(" method can be overruled, via ")),(0,e.bF)(c,{to:"/archive/current/packages/support/concerns/conflictResolution.html"},{default:(0,e.k6)((()=>s[21]||(s[21]=[(0,e.eW)("conflict resolution")]))),_:1}),s[25]||(s[25]=(0,e.eW)("!"))]),s[27]||(s[27]=(0,e.Lk)("p",null,[(0,e.eW)("If you truly wish to prevent certain properties or methods from being aliased into a target class, then you "),(0,e.Lk)("em",null,"should"),(0,e.eW)(" declare them as "),(0,e.Lk)("a",{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties",target:"_blank",rel:"noopener noreferrer"},"private"),(0,e.eW)(".")],-1))]),s[36]||(s[36]=(0,e.Fv)('<h2 id="concern-owner-instance" tabindex="-1"><a class="header-anchor" href="#concern-owner-instance"><span>Concern Owner instance</span></a></h2><p>The <code>concernOwner</code> property gives you direct access to the target class instance, in your concern. This allows you to create interaction between the target instance and your concern, which can be usefully in any number of situations. For instance, you can use the <code>concernOwner</code> to create a <a href="https://en.wikipedia.org/wiki/Fluent_interface" target="_blank" rel="noopener noreferrer">fluent design</a> of your utilities.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">ConcernsPeople</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token keyword">with</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token comment">// ...not shown here...</span></span>\n<span class="line"></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>concernOwner<span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line">@<span class="token function">use</span><span class="token punctuation">(</span>ConcernsPeople<span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Invitation</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token function">invite</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">/* ...not shown here... */</span> <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">const</span> party <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Invitation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line">party</span>\n<span class="line">    <span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span><span class="token string">&#39;Anna&#39;</span><span class="token punctuation">)</span></span>\n<span class="line">    <span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span><span class="token string">&#39;Anders&#39;</span><span class="token punctuation">)</span></span>\n<span class="line">    <span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span><span class="token string">&#39;Ulla&#39;</span><span class="token punctuation">)</span></span>\n<span class="line">    <span class="token punctuation">.</span><span class="token function">with</span><span class="token punctuation">(</span><span class="token string">&#39;Jimmy&#39;</span><span class="token punctuation">)</span></span>\n<span class="line">    <span class="token punctuation">.</span><span class="token function">invite</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="constructor" tabindex="-1"><a class="header-anchor" href="#constructor"><span>Constructor</span></a></h2><p>Should you require initialisation logic, then you can overwrite the <code>constructor</code> in your concern class. A concern&#39;s constructor is only given the target class instance as argument.</p>',5)),(0,e.Lk)("p",null,[(0,e.Lk)("em",null,[s[29]||(s[29]=(0,e.eW)("See ")),(0,e.bF)(c,{to:"/archive/current/packages/support/concerns/booting.html"},{default:(0,e.k6)((()=>s[28]||(s[28]=[(0,e.eW)("booting")]))),_:1}),s[30]||(s[30]=(0,e.eW)(" for additional information."))])]),s[37]||(s[37]=(0,e.Fv)('<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Recording</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">owner</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">super</span><span class="token punctuation">(</span>owner<span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line">        </span>\n<span class="line">        <span class="token comment">// ...perform your initialisation here...</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',1))])}]]);const i=JSON.parse('{"path":"/archive/current/packages/support/concerns/concernClass.html","title":"Concern Class","lang":"en-GB","frontmatter":{"title":"Concern Class","description":"How to define a new concern class.","sidebarDepth":0},"headers":[{"level":2,"title":"Inherit from AbstractConcern","slug":"inherit-from-abstractconcern","link":"#inherit-from-abstractconcern","children":[{"level":3,"title":"Private Members","slug":"private-members","link":"#private-members","children":[]},{"level":3,"title":"Static Members","slug":"static-members","link":"#static-members","children":[]},{"level":3,"title":"Transpilers","slug":"transpilers","link":"#transpilers","children":[]}]},{"level":2,"title":"Customise \\"alias\\" members","slug":"customise-alias-members","link":"#customise-alias-members","children":[]},{"level":2,"title":"Concern Owner instance","slug":"concern-owner-instance","link":"#concern-owner-instance","children":[]},{"level":2,"title":"Constructor","slug":"constructor","link":"#constructor","children":[]}],"git":{"updatedTime":1709641376000,"contributors":[{"name":"alin","email":"alin@rspsystems.com","commits":1}]},"filePathRelative":"archive/current/packages/support/concerns/concernClass.md","lastUpdatedDateFormat":"yyyy-MM-dd HH:mm:ss ZZZZ","lastUpdatedDateOptions":{}}')}}]);