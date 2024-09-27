"use strict";(self.webpackChunk_aedart_ion_monorepo=self.webpackChunk_aedart_ion_monorepo||[]).push([[1326],{5831:function(s,n,a){a.r(n),a.d(n,{comp:function(){return c},data:function(){return i}});var e=a(641);const p={class:"table-of-contents"},l={class:"hint-container tip"},t={};var c=(0,a(6262).A)(t,[["render",function(s,n){const a=(0,e.g2)("router-link"),t=(0,e.g2)("RouteLink");return(0,e.uX)(),(0,e.CE)("div",null,[n[8]||(n[8]=(0,e.Lk)("h1",{id:"jsdoc",tabindex:"-1"},[(0,e.Lk)("a",{class:"header-anchor",href:"#jsdoc"},[(0,e.Lk)("span",null,"JSDoc")])],-1)),n[9]||(n[9]=(0,e.Lk)("p",null,[(0,e.eW)("Most modern IDEs support "),(0,e.Lk)("a",{href:"https://jsdoc.app/",target:"_blank",rel:"noopener noreferrer"},"JSDoc"),(0,e.eW)(". They can improve your coding experience via code suggestions, highlights and other features. In this chapter, you will find a few ways that you can document your concerns and target class, via JSDoc.")],-1)),(0,e.Lk)("nav",p,[(0,e.Lk)("ul",null,[(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#mixin-and-mixes"},{default:(0,e.k6)((()=>n[0]||(n[0]=[(0,e.eW)("@mixin and @mixes")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#property"},{default:(0,e.k6)((()=>n[1]||(n[1]=[(0,e.eW)("@property")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#borrows"},{default:(0,e.k6)((()=>n[2]||(n[2]=[(0,e.eW)("@borrows")]))),_:1})]),(0,e.Lk)("li",null,[(0,e.bF)(a,{to:"#member"},{default:(0,e.k6)((()=>n[3]||(n[3]=[(0,e.eW)("@member")]))),_:1})])])]),(0,e.Lk)("div",l,[n[7]||(n[7]=(0,e.Lk)("p",{class:"hint-container-title"},"Help wanted!",-1)),(0,e.Lk)("p",null,[(0,e.Lk)("em",null,[n[5]||(n[5]=(0,e.eW)("If you are an expert in JSDoc, then you are most welcome to help improve this chapter. Please see the ")),(0,e.bF)(t,{to:"/archive/current/contribution-guide.html"},{default:(0,e.k6)((()=>n[4]||(n[4]=[(0,e.eW)("contribution guide")]))),_:1}),n[6]||(n[6]=(0,e.eW)(" for details on how you can contribute."))])])]),n[10]||(n[10]=(0,e.Fv)('<h2 id="mixin-and-mixes" tabindex="-1"><a class="header-anchor" href="#mixin-and-mixes"><span><code>@mixin</code> and <code>@mixes</code></span></a></h2><p>Possibly the easiest way to document your concern and target class that uses the concern, is via the <a href="https://jsdoc.app/tags-mixes" target="_blank" rel="noopener noreferrer"><code>@mixin</code> and <code>@mixes</code></a> tags.</p><p><strong>Downside</strong>: <em>Documenting &quot;aliases&quot; (known as virtual fields in the context of JSDoc) is not possible via <code>@mixin</code> and <code>@mixes</code>. You can describe an alias via <a href="https://jsdoc.app/tags-function" target="_blank" rel="noopener noreferrer"><code>@function</code></a> or <a href="https://jsdoc.app/tags-member" target="_blank" rel="noopener noreferrer"><code>@member</code></a> tag.</em></p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> use<span class="token punctuation">,</span> AbstractConcern <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token doc-comment comment">/**</span>\n<span class="line"> * <span class="token keyword">@mixin</span></span>\n<span class="line"> * <span class="token keyword">@extends</span> <span class="token class-name">AbstractConcern</span></span>\n<span class="line"> */</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Shield</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * Returns the armor level</span>\n<span class="line">     *</span>\n<span class="line">     * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span></span>\n<span class="line">     */</span></span>\n<span class="line">    <span class="token keyword">get</span> <span class="token function">armor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token number">8</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * Throw shield towards a target</span>\n<span class="line">     *</span>\n<span class="line">     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>object<span class="token punctuation">}</span></span> <span class="token parameter">target</span></span>\n<span class="line">     *</span>\n<span class="line">     * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> Damage given to target</span>\n<span class="line">     */</span></span>\n<span class="line">    <span class="token keyword">throw</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token comment">// target ignored here...</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token number">3</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token doc-comment comment">/**</span>\n<span class="line"> * <span class="token keyword">@mixes</span> Shield</span>\n<span class="line"> */</span></span>\n<span class="line">@<span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">[</span>Shield<span class="token punctuation">,</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token string-property property">&#39;throw&#39;</span><span class="token operator">:</span> <span class="token string">&#39;fight&#39;</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Monster</span> <span class="token punctuation">{</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * Alias for <span class="token punctuation">{</span><span class="token keyword">@link</span> Shield#throw<span class="token punctuation">}</span></span>\n<span class="line">     *</span>\n<span class="line">     * <span class="token keyword">@function</span> fight</span>\n<span class="line">     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>object<span class="token punctuation">}</span></span> <span class="token parameter">target</span> The target to throw at...</span>\n<span class="line">     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> Damage taken by target</span>\n<span class="line">     * <span class="token keyword">@instance</span></span>\n<span class="line">     * <span class="token keyword">@memberof</span> <span class="token class-name">Monster</span></span>\n<span class="line">     */</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * Do stuff...</span>\n<span class="line">     */</span></span>\n<span class="line">    <span class="token keyword">do</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">fight</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="property" tabindex="-1"><a class="header-anchor" href="#property"><span><code>@property</code></span></a></h2><p>Another possibility is to describe properties and methods available in a target, via the <a href="https://jsdoc.app/tags-property" target="_blank" rel="noopener noreferrer"><code>@property</code></a> tag. Doing so allows you to immediately describe the &quot;alias&quot; name.</p><p><strong>Downside</strong>: <em>Properties and methods described via <code>@property</code> are listed as &quot;static&quot; on the target class. Also, it is not possible to reuse existing JSDoc from your concern.</em></p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> use<span class="token punctuation">,</span> AbstractConcern <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Armor</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * Returns the armor level</span>\n<span class="line">     *</span>\n<span class="line">     * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span></span>\n<span class="line">     */</span></span>\n<span class="line">    <span class="token keyword">get</span> <span class="token function">level</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token number">8</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token doc-comment comment">/**</span>\n<span class="line"> * <span class="token keyword">@property</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">armor</span> Returns the armor level</span>\n<span class="line"> */</span></span>\n<span class="line">@<span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">[</span>Armor<span class="token punctuation">,</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token string-property property">&#39;level&#39;</span><span class="token operator">:</span> <span class="token string">&#39;armor&#39;</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Hero</span> <span class="token punctuation">{</span><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="borrows" tabindex="-1"><a class="header-anchor" href="#borrows"><span><code>@borrows</code></span></a></h2><p>The <a href="https://jsdoc.app/tags-borrows" target="_blank" rel="noopener noreferrer"><code>@borrows</code></a> tag does also offer a possible way to describe aliases.</p><p><strong>Downside</strong>: <em>You are still required to use <a href="https://jsdoc.app/tags-member" target="_blank" rel="noopener noreferrer"><code>@member</code></a> tag to describe the actual aliases inside your target class.</em></p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> use<span class="token punctuation">,</span> AbstractConcern <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token doc-comment comment">/**</span>\n<span class="line"> * <span class="token keyword">@extends</span> <span class="token class-name">AbstractConcern</span></span>\n<span class="line"> */</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Spell</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * Cast the spell</span>\n<span class="line">     *</span>\n<span class="line">     * <span class="token keyword">@name</span> cast</span>\n<span class="line">     * </span>\n<span class="line">     * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> Damage done</span>\n<span class="line">     */</span></span>\n<span class="line">    <span class="token function">cast</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token number">7</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"><span class="token doc-comment comment">/**</span>\n<span class="line"> * <span class="token keyword">@borrows</span> Spell#cast as damage</span>\n<span class="line"> */</span></span>\n<span class="line">@<span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">[</span>Spell<span class="token punctuation">,</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token string-property property">&#39;cast&#39;</span><span class="token operator">:</span> <span class="token string">&#39;damage&#39;</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Mage</span> <span class="token punctuation">{</span></span>\n<span class="line">    </span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * <span class="token keyword">@function</span> damage</span>\n<span class="line">     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span></span>\n<span class="line">     * <span class="token keyword">@instance</span></span>\n<span class="line">     * <span class="token keyword">@memberof</span> <span class="token class-name">Npc</span></span>\n<span class="line">     */</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="member" tabindex="-1"><a class="header-anchor" href="#member"><span><code>@member</code></span></a></h2><p>Lastly, you can use <a href="https://jsdoc.app/tags-member" target="_blank" rel="noopener noreferrer"><code>@member</code></a> to describe all aliases directly, without relying on the <a href="https://jsdoc.app/tags-borrows" target="_blank" rel="noopener noreferrer"><code>@borrows</code></a> tag.</p><p><strong>Downside</strong>: <em>This approach can be very cumbersome. Also, reuse of JSDoc is not possible.</em></p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> use<span class="token punctuation">,</span> AbstractConcern <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@aedart/support/concerns&quot;</span><span class="token punctuation">;</span></span>\n<span class="line"></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Sword</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractConcern</span> <span class="token punctuation">{</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * Returns amount of damage</span>\n<span class="line">     *</span>\n<span class="line">     * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span></span>\n<span class="line">     */</span></span>\n<span class="line">    <span class="token keyword">get</span> <span class="token function">slash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token number">3</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * Returns the sword type</span>\n<span class="line">     *</span>\n<span class="line">     * <span class="token keyword">@name</span> type</span>\n<span class="line">     * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span></span>\n<span class="line">     */</span></span>\n<span class="line">    <span class="token keyword">get</span> <span class="token function">type</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>\n<span class="line">        <span class="token keyword">return</span> <span class="token string">&#39;unique&#39;</span><span class="token punctuation">;</span></span>\n<span class="line">    <span class="token punctuation">}</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span>\n<span class="line"></span>\n<span class="line">@<span class="token function">use</span><span class="token punctuation">(</span><span class="token punctuation">[</span>Sword<span class="token punctuation">,</span> <span class="token punctuation">{</span></span>\n<span class="line">    <span class="token string-property property">&#39;slash&#39;</span><span class="token operator">:</span> <span class="token string">&#39;damage&#39;</span></span>\n<span class="line"><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">)</span></span>\n<span class="line"><span class="token keyword">class</span> <span class="token class-name">Enemy</span> <span class="token punctuation">{</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * <span class="token keyword">@public</span></span>\n<span class="line">     * <span class="token keyword">@member</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> damage  Alias for <span class="token punctuation">{</span><span class="token keyword">@link</span> Sword#slash<span class="token punctuation">}</span></span>\n<span class="line">     * <span class="token keyword">@memberof</span> <span class="token class-name">Enemy</span></span>\n<span class="line">     */</span></span>\n<span class="line"></span>\n<span class="line">    <span class="token doc-comment comment">/**</span>\n<span class="line">     * <span class="token keyword">@public</span></span>\n<span class="line">     * <span class="token keyword">@member</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">}</span></span> type Alias for <span class="token punctuation">{</span><span class="token keyword">@link</span> Sword#type<span class="token punctuation">}</span></span>\n<span class="line">     * <span class="token keyword">@memberof</span> <span class="token class-name">Enemy</span></span>\n<span class="line">     */</span></span>\n<span class="line"><span class="token punctuation">}</span></span>\n<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',16))])}]]);const i=JSON.parse('{"path":"/archive/current/packages/support/concerns/jsdoc.html","title":"JSDoc","lang":"en-GB","frontmatter":{"title":"JSDoc","description":"A wat to document what concerns a targer class uses.","sidebarDepth":0},"headers":[{"level":2,"title":"@mixin and @mixes","slug":"mixin-and-mixes","link":"#mixin-and-mixes","children":[]},{"level":2,"title":"@property","slug":"property","link":"#property","children":[]},{"level":2,"title":"@borrows","slug":"borrows","link":"#borrows","children":[]},{"level":2,"title":"@member","slug":"member","link":"#member","children":[]}],"git":{"updatedTime":1709641376000,"contributors":[{"name":"alin","email":"alin@rspsystems.com","commits":1}]},"filePathRelative":"archive/current/packages/support/concerns/jsdoc.md","lastUpdatedDateFormat":"yyyy-MM-dd HH:mm:ss ZZZZ","lastUpdatedDateOptions":{}}')}}]);