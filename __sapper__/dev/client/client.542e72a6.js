import './_rollup-plugin-inject-process-env.d2a692b0.js';

function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function exclude_internal_props(props) {
    const result = {};
    for (const k in props)
        if (k[0] !== '$')
            result[k] = props[k];
    return result;
}
function set_store_value(store, ret, value = ret) {
    store.set(value);
    return ret;
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
    return function (event) {
        event.preventDefault();
        // @ts-ignore
        return fn.call(this, event);
    };
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function set_attributes(node, attributes) {
    // @ts-ignore
    const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
    for (const key in attributes) {
        if (attributes[key] == null) {
            node.removeAttribute(key);
        }
        else if (key === 'style') {
            node.style.cssText = attributes[key];
        }
        else if (key === '__value') {
            node.value = node[key] = attributes[key];
        }
        else if (descriptors[key] && descriptors[key].set) {
            node[key] = attributes[key];
        }
        else {
            attr(node, key, attributes[key]);
        }
    }
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_element(nodes, name, attributes, svg) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
            let j = 0;
            const remove = [];
            while (j < node.attributes.length) {
                const attribute = node.attributes[j++];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            for (let k = 0; k < remove.length; k++) {
                node.removeAttribute(remove[k]);
            }
            return nodes.splice(i, 1)[0];
        }
    }
    return svg ? svg_element(name) : element(name);
}
function claim_text(nodes, data) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
            node.data = '' + data;
            return nodes.splice(i, 1)[0];
        }
    }
    return text(data);
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_input_value(input, value) {
    input.value = value == null ? '' : value;
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}
function query_selector_all(selector, parent = document.body) {
    return Array.from(parent.querySelectorAll(selector));
}
class HtmlTag {
    constructor(anchor = null) {
        this.a = anchor;
        this.e = this.n = null;
    }
    m(html, target, anchor = null) {
        if (!this.e) {
            this.e = element(target.nodeName);
            this.t = target;
            this.h(html);
        }
        this.i(anchor);
    }
    h(html) {
        this.e.innerHTML = html;
        this.n = Array.from(this.e.childNodes);
    }
    i(anchor) {
        for (let i = 0; i < this.n.length; i += 1) {
            insert(this.t, this.n[i], anchor);
        }
    }
    p(html) {
        this.d();
        this.h(html);
        this.i(this.a);
    }
    d() {
        this.n.forEach(detach);
    }
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
    get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}
// TODO figure out if we still want to support
// shorthand events, or if we want to implement
// a real bubbling mechanism
function bubble(component, event) {
    const callbacks = component.$$.callbacks[event.type];
    if (callbacks) {
        callbacks.slice().forEach(fn => fn(event));
    }
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.30.1' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function prop_dev(node, property, value) {
    node[property] = value;
    dispatch_dev('SvelteDOMSetProperty', { node, property, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}

const CONTEXT_KEY = {};

const file = "src/components/Header.svelte";

function create_fragment(ctx) {
	let nav;
	let div0;
	let a0;
	let t0;
	let t1;
	let a1;
	let span0;
	let t2;
	let span1;
	let t3;
	let span2;
	let a1_class_value;
	let t4;
	let div2;
	let div1;
	let a2;
	let t5;
	let t6;
	let a3;
	let t7;
	let div2_class_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			nav = element("nav");
			div0 = element("div");
			a0 = element("a");
			t0 = text("My Diary");
			t1 = space();
			a1 = element("a");
			span0 = element("span");
			t2 = space();
			span1 = element("span");
			t3 = space();
			span2 = element("span");
			t4 = space();
			div2 = element("div");
			div1 = element("div");
			a2 = element("a");
			t5 = text("My Account");
			t6 = space();
			a3 = element("a");
			t7 = text("Setting");
			this.h();
		},
		l: function claim(nodes) {
			nav = claim_element(nodes, "NAV", {
				class: true,
				role: true,
				"aria-label": true
			});

			var nav_nodes = children(nav);
			div0 = claim_element(nav_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			a0 = claim_element(div0_nodes, "A", { class: true, href: true });
			var a0_nodes = children(a0);
			t0 = claim_text(a0_nodes, "My Diary");
			a0_nodes.forEach(detach_dev);
			t1 = claim_space(div0_nodes);

			a1 = claim_element(div0_nodes, "A", {
				href: true,
				role: true,
				class: true,
				"aria-label": true,
				"aria-expanded": true
			});

			var a1_nodes = children(a1);
			span0 = claim_element(a1_nodes, "SPAN", { "aria-hidden": true });
			children(span0).forEach(detach_dev);
			t2 = claim_space(a1_nodes);
			span1 = claim_element(a1_nodes, "SPAN", { "aria-hidden": true });
			children(span1).forEach(detach_dev);
			t3 = claim_space(a1_nodes);
			span2 = claim_element(a1_nodes, "SPAN", { "aria-hidden": true });
			children(span2).forEach(detach_dev);
			a1_nodes.forEach(detach_dev);
			div0_nodes.forEach(detach_dev);
			t4 = claim_space(nav_nodes);
			div2 = claim_element(nav_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			a2 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a2_nodes = children(a2);
			t5 = claim_text(a2_nodes, "My Account");
			a2_nodes.forEach(detach_dev);
			t6 = claim_space(div1_nodes);
			a3 = claim_element(div1_nodes, "A", { href: true, class: true });
			var a3_nodes = children(a3);
			t7 = claim_text(a3_nodes, "Setting");
			a3_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			nav_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(a0, "class", "navbar-item");
			attr_dev(a0, "href", "/");
			add_location(a0, file, 6, 4, 130);
			attr_dev(span0, "aria-hidden", "true");
			add_location(span0, file, 16, 6, 392);
			attr_dev(span1, "aria-hidden", "true");
			add_location(span1, file, 17, 6, 431);
			attr_dev(span2, "aria-hidden", "true");
			add_location(span2, file, 18, 6, 470);
			attr_dev(a1, "href", "javascript:void(0)");
			attr_dev(a1, "role", "button");
			attr_dev(a1, "class", a1_class_value = "navbar-burger " + (/*burgetIsActive*/ ctx[0] && "is-active"));
			attr_dev(a1, "aria-label", "menu");
			attr_dev(a1, "aria-expanded", "false");
			add_location(a1, file, 8, 4, 182);
			attr_dev(div0, "class", "navbar-brand");
			add_location(div0, file, 5, 2, 99);
			attr_dev(a2, "href", "/");
			attr_dev(a2, "class", "navbar-item");
			add_location(a2, file, 23, 6, 616);
			attr_dev(a3, "href", "/");
			attr_dev(a3, "class", "navbar-item");
			add_location(a3, file, 24, 6, 669);
			attr_dev(div1, "class", "navbar-end");
			add_location(div1, file, 22, 4, 585);
			attr_dev(div2, "class", div2_class_value = "navbar-menu " + (/*burgetIsActive*/ ctx[0] && "is-active"));
			add_location(div2, file, 21, 2, 523);
			attr_dev(nav, "class", "navbar is-primary has-shadow");
			attr_dev(nav, "role", "navigation");
			attr_dev(nav, "aria-label", "main navigation");
			add_location(nav, file, 0, 0, 0);
		},
		m: function mount(target, anchor) {
			insert_dev(target, nav, anchor);
			append_dev(nav, div0);
			append_dev(div0, a0);
			append_dev(a0, t0);
			append_dev(div0, t1);
			append_dev(div0, a1);
			append_dev(a1, span0);
			append_dev(a1, t2);
			append_dev(a1, span1);
			append_dev(a1, t3);
			append_dev(a1, span2);
			append_dev(nav, t4);
			append_dev(nav, div2);
			append_dev(div2, div1);
			append_dev(div1, a2);
			append_dev(a2, t5);
			append_dev(div1, t6);
			append_dev(div1, a3);
			append_dev(a3, t7);

			if (!mounted) {
				dispose = listen_dev(a1, "click", /*clickBurger*/ ctx[1], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*burgetIsActive*/ 1 && a1_class_value !== (a1_class_value = "navbar-burger " + (/*burgetIsActive*/ ctx[0] && "is-active"))) {
				attr_dev(a1, "class", a1_class_value);
			}

			if (dirty & /*burgetIsActive*/ 1 && div2_class_value !== (div2_class_value = "navbar-menu " + (/*burgetIsActive*/ ctx[0] && "is-active"))) {
				attr_dev(div2, "class", div2_class_value);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(nav);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Header", slots, []);
	let burgetIsActive = false;

	function clickBurger() {
		$$invalidate(0, burgetIsActive = !burgetIsActive);
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Header> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ burgetIsActive, clickBurger });

	$$self.$inject_state = $$props => {
		if ("burgetIsActive" in $$props) $$invalidate(0, burgetIsActive = $$props.burgetIsActive);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [burgetIsActive, clickBurger];
}

class Header extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Header",
			options,
			id: create_fragment.name
		});
	}
}

const createLoading = () => {
    const { set, subscribe } = writable(true);
    return {
        process: () => set(true),
        complete: () => set(false),
        subscribe,
    };
};
const loadingStore = createLoading();

const range = (size, startAt = 0) =>
  [...Array(size).keys()].map(i => i + startAt);

const file$1 = "node_modules/svelte-loading-spinners/src/Wave.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[3] = list[i];
	return child_ctx;
}

// (42:2) {#each range(10, 0) as version}
function create_each_block(ctx) {
	let div;

	const block = {
		c: function create() {
			div = element("div");
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			children(div).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "bar svelte-1e5yicz");
			set_style(div, "left", /*version*/ ctx[3] * (/*size*/ ctx[0] / 5 + (/*size*/ ctx[0] / 15 - /*size*/ ctx[0] / 100)) + /*unit*/ ctx[2]);
			set_style(div, "animation-delay", /*version*/ ctx[3] * 0.15 + "s");
			add_location(div, file$1, 42, 2, 2729);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*size, unit*/ 5) {
				set_style(div, "left", /*version*/ ctx[3] * (/*size*/ ctx[0] / 5 + (/*size*/ ctx[0] / 15 - /*size*/ ctx[0] / 100)) + /*unit*/ ctx[2]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(42:2) {#each range(10, 0) as version}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let div;
	let each_value = range(10, 0);
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true, style: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "wrapper svelte-1e5yicz");
			set_style(div, "--size", /*size*/ ctx[0] + /*unit*/ ctx[2]);
			set_style(div, "--color", /*color*/ ctx[1]);
			add_location(div, file$1, 40, 0, 2622);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*range, size, unit*/ 5) {
				each_value = range(10, 0);
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						each_blocks[i].m(div, null);
					}
				}

				for (; i < each_blocks.length; i += 1) {
					each_blocks[i].d(1);
				}

				each_blocks.length = each_value.length;
			}

			if (dirty & /*size, unit*/ 5) {
				set_style(div, "--size", /*size*/ ctx[0] + /*unit*/ ctx[2]);
			}

			if (dirty & /*color*/ 2) {
				set_style(div, "--color", /*color*/ ctx[1]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Wave", slots, []);
	let { size = 60 } = $$props;
	let { color = "#FF3E00" } = $$props;
	let { unit = "px" } = $$props;
	const writable_props = ["size", "color", "unit"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Wave> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("size" in $$props) $$invalidate(0, size = $$props.size);
		if ("color" in $$props) $$invalidate(1, color = $$props.color);
		if ("unit" in $$props) $$invalidate(2, unit = $$props.unit);
	};

	$$self.$capture_state = () => ({ range, size, color, unit });

	$$self.$inject_state = $$props => {
		if ("size" in $$props) $$invalidate(0, size = $$props.size);
		if ("color" in $$props) $$invalidate(1, color = $$props.color);
		if ("unit" in $$props) $$invalidate(2, unit = $$props.unit);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [size, color, unit];
}

class Wave extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { size: 0, color: 1, unit: 2 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Wave",
			options,
			id: create_fragment$1.name
		});
	}

	get size() {
		throw new Error("<Wave>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Wave>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<Wave>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<Wave>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get unit() {
		throw new Error("<Wave>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set unit(value) {
		throw new Error("<Wave>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const file$2 = "src/components/WaveLoading.svelte";

function create_fragment$2(ctx) {
	let main;
	let wave;
	let current;

	wave = new Wave({
			props: { color: /*color*/ ctx[1] },
			$$inline: true
		});

	const block = {
		c: function create() {
			main = element("main");
			create_component(wave.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			main = claim_element(nodes, "MAIN", { class: true, style: true });
			var main_nodes = children(main);
			claim_component(wave.$$.fragment, main_nodes);
			main_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(main, "class", "loading-wrap svelte-ijvfg3");
			set_style(main, "--backgroundColor", /*backgroundColor*/ ctx[0]);
			add_location(main, file$2, 12, 0, 805);
		},
		m: function mount(target, anchor) {
			insert_dev(target, main, anchor);
			mount_component(wave, main, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const wave_changes = {};
			if (dirty & /*color*/ 2) wave_changes.color = /*color*/ ctx[1];
			wave.$set(wave_changes);

			if (!current || dirty & /*backgroundColor*/ 1) {
				set_style(main, "--backgroundColor", /*backgroundColor*/ ctx[0]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(wave.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(wave.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(main);
			destroy_component(wave);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("WaveLoading", slots, []);
	let { backgroundColor = "#F24767" } = $$props;
	let { color = "#FFFFFF" } = $$props;
	const writable_props = ["backgroundColor", "color"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<WaveLoading> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("backgroundColor" in $$props) $$invalidate(0, backgroundColor = $$props.backgroundColor);
		if ("color" in $$props) $$invalidate(1, color = $$props.color);
	};

	$$self.$capture_state = () => ({ Wave, backgroundColor, color });

	$$self.$inject_state = $$props => {
		if ("backgroundColor" in $$props) $$invalidate(0, backgroundColor = $$props.backgroundColor);
		if ("color" in $$props) $$invalidate(1, color = $$props.color);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [backgroundColor, color];
}

class WaveLoading extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { backgroundColor: 0, color: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "WaveLoading",
			options,
			id: create_fragment$2.name
		});
	}

	get backgroundColor() {
		throw new Error("<WaveLoading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set backgroundColor(value) {
		throw new Error("<WaveLoading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get color() {
		throw new Error("<WaveLoading>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set color(value) {
		throw new Error("<WaveLoading>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const file$3 = "src/routes/_layout.svelte";

// (7:0) {:else}
function create_else_block(ctx) {
	let header;
	let t;
	let main;
	let current;
	header = new Header({ $$inline: true });
	const default_slot_template = /*#slots*/ ctx[2].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

	const block = {
		c: function create() {
			create_component(header.$$.fragment);
			t = space();
			main = element("main");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			claim_component(header.$$.fragment, nodes);
			t = claim_space(nodes);
			main = claim_element(nodes, "MAIN", { class: true });
			var main_nodes = children(main);
			if (default_slot) default_slot.l(main_nodes);
			main_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(main, "class", "container pt-6");
			add_location(main, file$3, 8, 2, 245);
		},
		m: function mount(target, anchor) {
			mount_component(header, target, anchor);
			insert_dev(target, t, anchor);
			insert_dev(target, main, anchor);

			if (default_slot) {
				default_slot.m(main, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 2) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(header.$$.fragment, local);
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(header.$$.fragment, local);
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(header, detaching);
			if (detaching) detach_dev(t);
			if (detaching) detach_dev(main);
			if (default_slot) default_slot.d(detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(7:0) {:else}",
		ctx
	});

	return block;
}

// (5:0) {#if $loadingStore}
function create_if_block(ctx) {
	let loading;
	let current;
	loading = new WaveLoading({ $$inline: true });

	const block = {
		c: function create() {
			create_component(loading.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(loading.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(loading, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(loading.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(loading.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(loading, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(5:0) {#if $loadingStore}",
		ctx
	});

	return block;
}

function create_fragment$3(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$loadingStore*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let $loadingStore;
	validate_store(loadingStore, "loadingStore");
	component_subscribe($$self, loadingStore, $$value => $$invalidate(0, $loadingStore = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Layout", slots, ['default']);

	onMount(() => {
		loadingStore.complete();
	});

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Layout> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		onMount,
		Header,
		loadingStore,
		Loading: WaveLoading,
		$loadingStore
	});

	return [$loadingStore, $$scope, slots];
}

class Layout extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Layout",
			options,
			id: create_fragment$3.name
		});
	}
}

var root_comp = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Layout
});

const { Error: Error_1 } = globals;
const file$4 = "src/routes/_error.svelte";

// (37:0) {#if dev && error.stack}
function create_if_block$1(ctx) {
	let pre;
	let t_value = /*error*/ ctx[1].stack + "";
	let t;

	const block = {
		c: function create() {
			pre = element("pre");
			t = text(t_value);
			this.h();
		},
		l: function claim(nodes) {
			pre = claim_element(nodes, "PRE", {});
			var pre_nodes = children(pre);
			t = claim_text(pre_nodes, t_value);
			pre_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(pre, file$4, 37, 1, 1170);
		},
		m: function mount(target, anchor) {
			insert_dev(target, pre, anchor);
			append_dev(pre, t);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*error*/ 2 && t_value !== (t_value = /*error*/ ctx[1].stack + "")) set_data_dev(t, t_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(pre);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(37:0) {#if dev && error.stack}",
		ctx
	});

	return block;
}

function create_fragment$4(ctx) {
	let title_value;
	let t0;
	let h1;
	let t1;
	let t2;
	let p;
	let t3_value = /*error*/ ctx[1].message + "";
	let t3;
	let t4;
	let if_block_anchor;
	document.title = title_value = /*status*/ ctx[0];
	let if_block = /*dev*/ ctx[2] && /*error*/ ctx[1].stack && create_if_block$1(ctx);

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text(/*status*/ ctx[0]);
			t2 = space();
			p = element("p");
			t3 = text(t3_value);
			t4 = space();
			if (if_block) if_block.c();
			if_block_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1o9r2ue\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", { class: true });
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, /*status*/ ctx[0]);
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			p = claim_element(nodes, "P", { class: true });
			var p_nodes = children(p);
			t3 = claim_text(p_nodes, t3_value);
			p_nodes.forEach(detach_dev);
			t4 = claim_space(nodes);
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			attr_dev(h1, "class", "svelte-1hjjbzs");
			add_location(h1, file$4, 32, 0, 1101);
			attr_dev(p, "class", "svelte-1hjjbzs");
			add_location(p, file$4, 34, 0, 1120);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, p, anchor);
			append_dev(p, t3);
			insert_dev(target, t4, anchor);
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*status*/ 1 && title_value !== (title_value = /*status*/ ctx[0])) {
				document.title = title_value;
			}

			if (dirty & /*status*/ 1) set_data_dev(t1, /*status*/ ctx[0]);
			if (dirty & /*error*/ 2 && t3_value !== (t3_value = /*error*/ ctx[1].message + "")) set_data_dev(t3, t3_value);

			if (/*dev*/ ctx[2] && /*error*/ ctx[1].stack) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(p);
			if (detaching) detach_dev(t4);
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$4.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$4($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Error", slots, []);
	let { status } = $$props;
	let { error } = $$props;
	const dev = "development" === "development";
	const writable_props = ["status", "error"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Error> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	$$self.$capture_state = () => ({ status, error, dev });

	$$self.$inject_state = $$props => {
		if ("status" in $$props) $$invalidate(0, status = $$props.status);
		if ("error" in $$props) $$invalidate(1, error = $$props.error);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [status, error, dev];
}

class Error$1 extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$4, create_fragment$4, safe_not_equal, { status: 0, error: 1 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Error",
			options,
			id: create_fragment$4.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*status*/ ctx[0] === undefined && !("status" in props)) {
			console.warn("<Error> was created without expected prop 'status'");
		}

		if (/*error*/ ctx[1] === undefined && !("error" in props)) {
			console.warn("<Error> was created without expected prop 'error'");
		}
	}

	get status() {
		throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1("<Error>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1("<Error>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const { Error: Error_1$1 } = globals;

// (24:1) {:else}
function create_else_block$1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ segment: /*segments*/ ctx[2][1] }, /*level1*/ ctx[4].props];
	var switch_value = /*level1*/ ctx[4].component;

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: { default: [create_default_slot_1] },
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*segments, level1*/ 20)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][1] },
					dirty & /*level1*/ 16 && get_spread_object(/*level1*/ ctx[4].props)
				])
			: {};

			if (dirty & /*$$scope, level2*/ 288) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*level1*/ ctx[4].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block$1.name,
		type: "else",
		source: "(24:1) {:else}",
		ctx
	});

	return block;
}

// (22:1) {#if error}
function create_if_block$2(ctx) {
	let error_1;
	let current;

	error_1 = new Error$1({
			props: {
				error: /*error*/ ctx[0],
				status: /*status*/ ctx[1]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(error_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(error_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(error_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const error_1_changes = {};
			if (dirty & /*error*/ 1) error_1_changes.error = /*error*/ ctx[0];
			if (dirty & /*status*/ 2) error_1_changes.status = /*status*/ ctx[1];
			error_1.$set(error_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(error_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(error_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(error_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$2.name,
		type: "if",
		source: "(22:1) {#if error}",
		ctx
	});

	return block;
}

// (26:3) {#if level2}
function create_if_block_1(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [/*level2*/ ctx[5].props];
	var switch_value = /*level2*/ ctx[5].component;

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		c: function create() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		l: function claim(nodes) {
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*level2*/ 32)
			? get_spread_update(switch_instance_spread_levels, [get_spread_object(/*level2*/ ctx[5].props)])
			: {};

			if (switch_value !== (switch_value = /*level2*/ ctx[5].component)) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(26:3) {#if level2}",
		ctx
	});

	return block;
}

// (25:2) <svelte:component this="{level1.component}" segment="{segments[1]}" {...level1.props}>
function create_default_slot_1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*level2*/ ctx[5] && create_if_block_1(ctx);

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (/*level2*/ ctx[5]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*level2*/ 32) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot_1.name,
		type: "slot",
		source: "(25:2) <svelte:component this=\\\"{level1.component}\\\" segment=\\\"{segments[1]}\\\" {...level1.props}>",
		ctx
	});

	return block;
}

// (21:0) <Layout segment="{segments[0]}" {...level0.props}>
function create_default_slot(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block$2, create_else_block$1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*error*/ ctx[0]) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	const block = {
		c: function create() {
			if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(21:0) <Layout segment=\\\"{segments[0]}\\\" {...level0.props}>",
		ctx
	});

	return block;
}

function create_fragment$5(ctx) {
	let layout;
	let current;
	const layout_spread_levels = [{ segment: /*segments*/ ctx[2][0] }, /*level0*/ ctx[3].props];

	let layout_props = {
		$$slots: { default: [create_default_slot] },
		$$scope: { ctx }
	};

	for (let i = 0; i < layout_spread_levels.length; i += 1) {
		layout_props = assign(layout_props, layout_spread_levels[i]);
	}

	layout = new Layout({ props: layout_props, $$inline: true });

	const block = {
		c: function create() {
			create_component(layout.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(layout.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(layout, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const layout_changes = (dirty & /*segments, level0*/ 12)
			? get_spread_update(layout_spread_levels, [
					dirty & /*segments*/ 4 && { segment: /*segments*/ ctx[2][0] },
					dirty & /*level0*/ 8 && get_spread_object(/*level0*/ ctx[3].props)
				])
			: {};

			if (dirty & /*$$scope, error, status, level1, segments, level2*/ 311) {
				layout_changes.$$scope = { dirty, ctx };
			}

			layout.$set(layout_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(layout.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(layout.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(layout, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$5.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$5($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("App", slots, []);
	let { stores } = $$props;
	let { error } = $$props;
	let { status } = $$props;
	let { segments } = $$props;
	let { level0 } = $$props;
	let { level1 = null } = $$props;
	let { level2 = null } = $$props;
	let { notify } = $$props;
	afterUpdate(notify);
	setContext(CONTEXT_KEY, stores);

	const writable_props = [
		"stores",
		"error",
		"status",
		"segments",
		"level0",
		"level1",
		"level2",
		"notify"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("stores" in $$props) $$invalidate(6, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("level2" in $$props) $$invalidate(5, level2 = $$props.level2);
		if ("notify" in $$props) $$invalidate(7, notify = $$props.notify);
	};

	$$self.$capture_state = () => ({
		setContext,
		afterUpdate,
		CONTEXT_KEY,
		Layout,
		Error: Error$1,
		stores,
		error,
		status,
		segments,
		level0,
		level1,
		level2,
		notify
	});

	$$self.$inject_state = $$props => {
		if ("stores" in $$props) $$invalidate(6, stores = $$props.stores);
		if ("error" in $$props) $$invalidate(0, error = $$props.error);
		if ("status" in $$props) $$invalidate(1, status = $$props.status);
		if ("segments" in $$props) $$invalidate(2, segments = $$props.segments);
		if ("level0" in $$props) $$invalidate(3, level0 = $$props.level0);
		if ("level1" in $$props) $$invalidate(4, level1 = $$props.level1);
		if ("level2" in $$props) $$invalidate(5, level2 = $$props.level2);
		if ("notify" in $$props) $$invalidate(7, notify = $$props.notify);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [error, status, segments, level0, level1, level2, stores, notify];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$5, create_fragment$5, safe_not_equal, {
			stores: 6,
			error: 0,
			status: 1,
			segments: 2,
			level0: 3,
			level1: 4,
			level2: 5,
			notify: 7
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment$5.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*stores*/ ctx[6] === undefined && !("stores" in props)) {
			console.warn("<App> was created without expected prop 'stores'");
		}

		if (/*error*/ ctx[0] === undefined && !("error" in props)) {
			console.warn("<App> was created without expected prop 'error'");
		}

		if (/*status*/ ctx[1] === undefined && !("status" in props)) {
			console.warn("<App> was created without expected prop 'status'");
		}

		if (/*segments*/ ctx[2] === undefined && !("segments" in props)) {
			console.warn("<App> was created without expected prop 'segments'");
		}

		if (/*level0*/ ctx[3] === undefined && !("level0" in props)) {
			console.warn("<App> was created without expected prop 'level0'");
		}

		if (/*notify*/ ctx[7] === undefined && !("notify" in props)) {
			console.warn("<App> was created without expected prop 'notify'");
		}
	}

	get stores() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set stores(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get error() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set error(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get status() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set status(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get segments() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set segments(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level0() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level0(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level1() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level1(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get level2() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set level2(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get notify() {
		throw new Error_1$1("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set notify(value) {
		throw new Error_1$1("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

const ignore = [/^\/blog\.json$/, /^\/blog\/([^/]+?)\.json$/];

const components = [
	{
		js: () => Promise.all([import('./index.24795c76.js'), __inject_styles(["client-7e5cfcf1.css","ApolloClientStore-cae9c9c9.css","index-769b21d0.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./_layout.5d45348d.js'), __inject_styles(["client-7e5cfcf1.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.4c2e73c6.js'), __inject_styles(["client-7e5cfcf1.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./_layout.c35ec238.js'), __inject_styles(["client-7e5cfcf1.css","_layout-accc51ff.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.04e42018.js'), __inject_styles(["client-7e5cfcf1.css","ApolloClientStore-cae9c9c9.css","index-7c9dd74f.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.e4526d14.js'), __inject_styles(["client-7e5cfcf1.css","index-eb729130.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./[slug].771040b3.js'), __inject_styles(["client-7e5cfcf1.css","[slug]-2a7233ee.css"])]).then(function(x) { return x[0]; })
	},
	{
		js: () => Promise.all([import('./index.c6bf3154.js'), __inject_styles(["client-7e5cfcf1.css","ApolloClientStore-cae9c9c9.css","index-c4d680ae.css"])]).then(function(x) { return x[0]; })
	}
];

const routes = (d => [
	{
		// index.svelte
		pattern: /^\/$/,
		parts: [
			{ i: 0 }
		]
	},

	{
		// login/index.svelte
		pattern: /^\/login\/?$/,
		parts: [
			{ i: 1 },
			{ i: 2 }
		]
	},

	{
		// write/index.svelte
		pattern: /^\/write\/?$/,
		parts: [
			{ i: 3 },
			{ i: 4 }
		]
	},

	{
		// blog/index.svelte
		pattern: /^\/blog\/?$/,
		parts: [
			{ i: 5 }
		]
	},

	{
		// blog/[slug].svelte
		pattern: /^\/blog\/([^/]+?)\/?$/,
		parts: [
			null,
			{ i: 6, params: match => ({ slug: d(match[1]) }) }
		]
	},

	{
		// chat/index.svelte
		pattern: /^\/chat\/?$/,
		parts: [
			{ i: 7 }
		]
	}
])(decodeURIComponent);

if (typeof window !== 'undefined') {
	Promise.all([import('./sapper-dev-client.557e78e5.js'), ]).then(function(x) { return x[0]; }).then(client => {
		client.connect(10000);
	});
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function find_anchor(node) {
    while (node && node.nodeName.toUpperCase() !== 'A')
        node = node.parentNode; // SVG <a> elements have a lowercase name
    return node;
}

let uid = 1;
function set_uid(n) {
    uid = n;
}
let cid;
function set_cid(n) {
    cid = n;
}
const _history = typeof history !== 'undefined' ? history : {
    pushState: () => { },
    replaceState: () => { },
    scrollRestoration: 'auto'
};
const scroll_history = {};
function load_current_page() {
    return Promise.resolve().then(() => {
        const { hash, href } = location;
        _history.replaceState({ id: uid }, '', href);
        const target = select_target(new URL(location.href));
        if (target)
            return navigate(target, uid, true, hash);
    });
}
let base_url;
let handle_target;
function init$1(base, handler) {
    base_url = base;
    handle_target = handler;
    if ('scrollRestoration' in _history) {
        _history.scrollRestoration = 'manual';
    }
    // Adopted from Nuxt.js
    // Reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    addEventListener('beforeunload', () => {
        _history.scrollRestoration = 'auto';
    });
    // Setting scrollRestoration to manual again when returning to this page.
    addEventListener('load', () => {
        _history.scrollRestoration = 'manual';
    });
    addEventListener('click', handle_click);
    addEventListener('popstate', handle_popstate);
}
function extract_query(search) {
    const query = Object.create(null);
    if (search.length > 0) {
        search.slice(1).split('&').forEach(searchParam => {
            const [, key, value = ''] = /([^=]*)(?:=(.*))?/.exec(decodeURIComponent(searchParam.replace(/\+/g, ' ')));
            if (typeof query[key] === 'string')
                query[key] = [query[key]];
            if (typeof query[key] === 'object')
                query[key].push(value);
            else
                query[key] = value;
        });
    }
    return query;
}
function select_target(url) {
    if (url.origin !== location.origin)
        return null;
    if (!url.pathname.startsWith(base_url))
        return null;
    let path = url.pathname.slice(base_url.length);
    if (path === '') {
        path = '/';
    }
    // avoid accidental clashes between server routes and page routes
    if (ignore.some(pattern => pattern.test(path)))
        return;
    for (let i = 0; i < routes.length; i += 1) {
        const route = routes[i];
        const match = route.pattern.exec(path);
        if (match) {
            const query = extract_query(url.search);
            const part = route.parts[route.parts.length - 1];
            const params = part.params ? part.params(match) : {};
            const page = { host: location.host, path, query, params };
            return { href: url.href, route, match, page };
        }
    }
}
function handle_click(event) {
    // Adapted from https://github.com/visionmedia/page.js
    // MIT license https://github.com/visionmedia/page.js#license
    if (which(event) !== 1)
        return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;
    if (event.defaultPrevented)
        return;
    const a = find_anchor(event.target);
    if (!a)
        return;
    if (!a.href)
        return;
    // check if link is inside an svg
    // in this case, both href and target are always inside an object
    const svg = typeof a.href === 'object' && a.href.constructor.name === 'SVGAnimatedString';
    const href = String(svg ? a.href.baseVal : a.href);
    if (href === location.href) {
        if (!location.hash)
            event.preventDefault();
        return;
    }
    // Ignore if tag has
    // 1. 'download' attribute
    // 2. rel='external' attribute
    if (a.hasAttribute('download') || a.getAttribute('rel') === 'external')
        return;
    // Ignore if <a> has a target
    if (svg ? a.target.baseVal : a.target)
        return;
    const url = new URL(href);
    // Don't handle hash changes
    if (url.pathname === location.pathname && url.search === location.search)
        return;
    const target = select_target(url);
    if (target) {
        const noscroll = a.hasAttribute('sapper:noscroll');
        navigate(target, null, noscroll, url.hash);
        event.preventDefault();
        _history.pushState({ id: cid }, '', url.href);
    }
}
function which(event) {
    return event.which === null ? event.button : event.which;
}
function scroll_state() {
    return {
        x: pageXOffset,
        y: pageYOffset
    };
}
function handle_popstate(event) {
    scroll_history[cid] = scroll_state();
    if (event.state) {
        const url = new URL(location.href);
        const target = select_target(url);
        if (target) {
            navigate(target, event.state.id);
        }
        else {
            // eslint-disable-next-line
            location.href = location.href; // nosonar
        }
    }
    else {
        // hashchange
        set_uid(uid + 1);
        set_cid(uid);
        _history.replaceState({ id: cid }, '', location.href);
    }
}
function navigate(dest, id, noscroll, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        const popstate = !!id;
        if (popstate) {
            cid = id;
        }
        else {
            const current_scroll = scroll_state();
            // clicked on a link. preserve scroll state
            scroll_history[cid] = current_scroll;
            cid = id = ++uid;
            scroll_history[cid] = noscroll ? current_scroll : { x: 0, y: 0 };
        }
        yield handle_target(dest);
        if (document.activeElement && (document.activeElement instanceof HTMLElement))
            document.activeElement.blur();
        if (!noscroll) {
            let scroll = scroll_history[id];
            let deep_linked;
            if (hash) {
                // scroll is an element id (from a hash), we need to compute y.
                deep_linked = document.getElementById(hash.slice(1));
                if (deep_linked) {
                    scroll = {
                        x: 0,
                        y: deep_linked.getBoundingClientRect().top + scrollY
                    };
                }
            }
            scroll_history[cid] = scroll;
            if (popstate || deep_linked) {
                scrollTo(scroll.x, scroll.y);
            }
            else {
                scrollTo(0, 0);
            }
        }
    });
}

function get_base_uri(window_document) {
    let baseURI = window_document.baseURI;
    if (!baseURI) {
        const baseTags = window_document.getElementsByTagName('base');
        baseURI = baseTags.length ? baseTags[0].href : window_document.URL;
    }
    return baseURI;
}

let prefetching = null;
let mousemove_timeout;
function start() {
    addEventListener('touchstart', trigger_prefetch);
    addEventListener('mousemove', handle_mousemove);
}
function prefetch(href) {
    const target = select_target(new URL(href, get_base_uri(document)));
    if (target) {
        if (!prefetching || href !== prefetching.href) {
            prefetching = { href, promise: hydrate_target(target) };
        }
        return prefetching.promise;
    }
}
function get_prefetched(target) {
    if (prefetching && prefetching.href === target.href) {
        return prefetching.promise;
    }
    else {
        return hydrate_target(target);
    }
}
function trigger_prefetch(event) {
    const a = find_anchor(event.target);
    if (a && a.rel === 'prefetch') {
        prefetch(a.href);
    }
}
function handle_mousemove(event) {
    clearTimeout(mousemove_timeout);
    mousemove_timeout = setTimeout(() => {
        trigger_prefetch(event);
    }, 20);
}

function goto(href, opts = { noscroll: false, replaceState: false }) {
    const target = select_target(new URL(href, get_base_uri(document)));
    if (target) {
        _history[opts.replaceState ? 'replaceState' : 'pushState']({ id: cid }, '', href);
        return navigate(target, null, opts.noscroll);
    }
    location.href = href;
    return new Promise(() => {
        /* never resolves */
    });
}

function page_store(value) {
    const store = writable(value);
    let ready = true;
    function notify() {
        ready = true;
        store.update(val => val);
    }
    function set(new_value) {
        ready = false;
        store.set(new_value);
    }
    function subscribe(run) {
        let old_value;
        return store.subscribe((new_value) => {
            if (old_value === undefined || (ready && new_value !== old_value)) {
                run(old_value = new_value);
            }
        });
    }
    return { notify, set, subscribe };
}

const initial_data = typeof __SAPPER__ !== 'undefined' && __SAPPER__;
let ready = false;
let root_component;
let current_token;
let root_preloaded;
let current_branch = [];
let current_query = '{}';
const stores = {
    page: page_store({}),
    preloading: writable(null),
    session: writable(initial_data && initial_data.session)
};
let $session;
let session_dirty;
stores.session.subscribe((value) => __awaiter(void 0, void 0, void 0, function* () {
    $session = value;
    if (!ready)
        return;
    session_dirty = true;
    const dest = select_target(new URL(location.href));
    const token = current_token = {};
    const { redirect, props, branch } = yield hydrate_target(dest);
    if (token !== current_token)
        return; // a secondary navigation happened while we were loading
    if (redirect) {
        yield goto(redirect.location, { replaceState: true });
    }
    else {
        yield render(branch, props, buildPageContext(props, dest.page));
    }
}));
let target;
function set_target(node) {
    target = node;
}
function start$1(opts) {
    set_target(opts.target);
    init$1(initial_data.baseUrl, handle_target$1);
    start();
    if (initial_data.error) {
        return Promise.resolve().then(() => {
            return handle_error();
        });
    }
    return load_current_page();
}
function handle_error() {
    const { host, pathname, search } = location;
    const { session, preloaded, status, error } = initial_data;
    if (!root_preloaded) {
        root_preloaded = preloaded && preloaded[0];
    }
    const props = {
        error,
        status,
        session,
        level0: {
            props: root_preloaded
        },
        level1: {
            props: {
                status,
                error
            },
            component: Error$1
        },
        segments: preloaded
    };
    const query = extract_query(search);
    render([], props, { host, path: pathname, query, params: {}, error });
}
function buildPageContext(props, page) {
    const { error } = props;
    return Object.assign({ error }, page);
}
function handle_target$1(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (root_component)
            stores.preloading.set(true);
        const hydrating = get_prefetched(dest);
        const token = current_token = {};
        const hydrated_target = yield hydrating;
        const { redirect } = hydrated_target;
        if (token !== current_token)
            return; // a secondary navigation happened while we were loading
        if (redirect) {
            yield goto(redirect.location, { replaceState: true });
        }
        else {
            const { props, branch } = hydrated_target;
            yield render(branch, props, buildPageContext(props, dest.page));
        }
    });
}
function render(branch, props, page) {
    return __awaiter(this, void 0, void 0, function* () {
        stores.page.set(page);
        stores.preloading.set(false);
        if (root_component) {
            root_component.$set(props);
        }
        else {
            props.stores = {
                page: { subscribe: stores.page.subscribe },
                preloading: { subscribe: stores.preloading.subscribe },
                session: stores.session
            };
            props.level0 = {
                props: yield root_preloaded
            };
            props.notify = stores.page.notify;
            root_component = new App({
                target,
                props,
                hydrate: true
            });
        }
        current_branch = branch;
        current_query = JSON.stringify(page.query);
        ready = true;
        session_dirty = false;
    });
}
function part_changed(i, segment, match, stringified_query) {
    // TODO only check query string changes for preload functions
    // that do in fact depend on it (using static analysis or
    // runtime instrumentation)
    if (stringified_query !== current_query)
        return true;
    const previous = current_branch[i];
    if (!previous)
        return false;
    if (segment !== previous.segment)
        return true;
    if (previous.match) {
        if (JSON.stringify(previous.match.slice(1, i + 2)) !== JSON.stringify(match.slice(1, i + 2))) {
            return true;
        }
    }
}
function hydrate_target(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        const { route, page } = dest;
        const segments = page.path.split('/').filter(Boolean);
        let redirect = null;
        const props = { error: null, status: 200, segments: [segments[0]] };
        const preload_context = {
            fetch: (url, opts) => fetch(url, opts),
            redirect: (statusCode, location) => {
                if (redirect && (redirect.statusCode !== statusCode || redirect.location !== location)) {
                    throw new Error('Conflicting redirects');
                }
                redirect = { statusCode, location };
            },
            error: (status, error) => {
                props.error = typeof error === 'string' ? new Error(error) : error;
                props.status = status;
            }
        };
        if (!root_preloaded) {
            const root_preload = undefined || (() => ({}));
            root_preloaded = initial_data.preloaded[0] || root_preload.call(preload_context, {
                host: page.host,
                path: page.path,
                query: page.query,
                params: {}
            }, $session);
        }
        let branch;
        let l = 1;
        try {
            const stringified_query = JSON.stringify(page.query);
            const match = route.pattern.exec(page.path);
            let segment_dirty = false;
            branch = yield Promise.all(route.parts.map((part, i) => __awaiter(this, void 0, void 0, function* () {
                const segment = segments[i];
                if (part_changed(i, segment, match, stringified_query))
                    segment_dirty = true;
                props.segments[l] = segments[i + 1]; // TODO make this less confusing
                if (!part)
                    return { segment };
                const j = l++;
                if (!session_dirty && !segment_dirty && current_branch[i] && current_branch[i].part === part.i) {
                    return current_branch[i];
                }
                segment_dirty = false;
                const { default: component, preload } = yield components[part.i].js();
                let preloaded;
                if (ready || !initial_data.preloaded[i + 1]) {
                    preloaded = preload
                        ? yield preload.call(preload_context, {
                            host: page.host,
                            path: page.path,
                            query: page.query,
                            params: part.params ? part.params(dest.match) : {}
                        }, $session)
                        : {};
                }
                else {
                    preloaded = initial_data.preloaded[i + 1];
                }
                return (props[`level${j}`] = { component, props: preloaded, segment, match, part: part.i });
            })));
        }
        catch (error) {
            props.error = error;
            props.status = 500;
            branch = [];
        }
        return { redirect, props, branch };
    });
}

(function (Object) {
  typeof globalThis !== 'object' && (
    this ?
      get() :
      (Object.defineProperty(Object.prototype, '_T_', {
        configurable: true,
        get: get
      }), _T_)
  );
  function get() {
    var global = this || self;
    global.globalThis = global;
    delete Object.prototype._T_;
  }
}(Object));
var globalThis$1 = globalThis;

start$1({
    target: document.querySelector('#sapper'),
});

export { listen as $, assign as A, exclude_internal_props as B, empty as C, group_outros as D, check_outros as E, bubble as F, create_slot as G, set_attributes as H, toggle_class as I, listen_dev as J, update_slot as K, get_spread_update as L, identity as M, globalThis$1 as N, noop as O, binding_callbacks as P, createEventDispatcher as Q, onDestroy as R, SvelteComponentDev as S, tick as T, add_render_callback as U, create_in_transition as V, create_out_transition as W, create_bidirectional_transition as X, get_spread_object as Y, HtmlTag as Z, goto as _, space as a, readable as a0, get_store_value as a1, flush as a2, set_style as a3, set_input_value as a4, prevent_default as a5, set_data_dev as a6, run_all as a7, validate_each_argument as a8, destroy_each as a9, validate_store as aa, component_subscribe as ab, set_store_value as ac, setContext as ad, getContext as ae, prop_dev as af, current_component as ag, action_destroyer as ah, bind as ai, add_flush_callback as aj, detach_dev as b, create_component as c, dispatch_dev as d, element as e, claim_space as f, claim_element as g, children as h, init as i, claim_text as j, claim_component as k, attr_dev as l, add_location as m, insert_dev as n, append_dev as o, mount_component as p, query_selector_all as q, transition_in as r, safe_not_equal as s, text as t, transition_out as u, validate_slots as v, writable as w, destroy_component as x, globals as y, onMount as z };

import __inject_styles from './inject_styles.f6fc8b04.js';//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LjU0MmU3MmE2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlL2ludGVybmFsL2luZGV4Lm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUvc3RvcmUvaW5kZXgubWpzIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL3NoYXJlZC5tanMiLCIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9IZWFkZXIuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3N0b3JlL0xvYWRpbmdTdG9yZS50cyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsdGUtbG9hZGluZy1zcGlubmVycy9zcmMvdXRpbHMuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbHRlLWxvYWRpbmctc3Bpbm5lcnMvc3JjL1dhdmUuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvV2F2ZUxvYWRpbmcuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9fbGF5b3V0LnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvX2Vycm9yLnN2ZWx0ZSIsIi4uLy4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9pbnRlcm5hbC9BcHAuc3ZlbHRlIiwiLi4vLi4vLi4vc3JjL25vZGVfbW9kdWxlcy9Ac2FwcGVyL2ludGVybmFsL21hbmlmZXN0LWNsaWVudC5tanMiLCIuLi8uLi8uLi9zcmMvbm9kZV9tb2R1bGVzL0BzYXBwZXIvYXBwLm1qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AdW5nYXAvZ2xvYmFsLXRoaXMvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vc3JjL2NsaWVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBub29wKCkgeyB9XG5jb25zdCBpZGVudGl0eSA9IHggPT4geDtcbmZ1bmN0aW9uIGFzc2lnbih0YXIsIHNyYykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBmb3IgKGNvbnN0IGsgaW4gc3JjKVxuICAgICAgICB0YXJba10gPSBzcmNba107XG4gICAgcmV0dXJuIHRhcjtcbn1cbmZ1bmN0aW9uIGlzX3Byb21pc2UodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFkZF9sb2NhdGlvbihlbGVtZW50LCBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIpIHtcbiAgICBlbGVtZW50Ll9fc3ZlbHRlX21ldGEgPSB7XG4gICAgICAgIGxvYzogeyBmaWxlLCBsaW5lLCBjb2x1bW4sIGNoYXIgfVxuICAgIH07XG59XG5mdW5jdGlvbiBydW4oZm4pIHtcbiAgICByZXR1cm4gZm4oKTtcbn1cbmZ1bmN0aW9uIGJsYW5rX29iamVjdCgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShudWxsKTtcbn1cbmZ1bmN0aW9uIHJ1bl9hbGwoZm5zKSB7XG4gICAgZm5zLmZvckVhY2gocnVuKTtcbn1cbmZ1bmN0aW9uIGlzX2Z1bmN0aW9uKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIHNhZmVfbm90X2VxdWFsKGEsIGIpIHtcbiAgICByZXR1cm4gYSAhPSBhID8gYiA9PSBiIDogYSAhPT0gYiB8fCAoKGEgJiYgdHlwZW9mIGEgPT09ICdvYmplY3QnKSB8fCB0eXBlb2YgYSA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5mdW5jdGlvbiBub3RfZXF1YWwoYSwgYikge1xuICAgIHJldHVybiBhICE9IGEgPyBiID09IGIgOiBhICE9PSBiO1xufVxuZnVuY3Rpb24gaXNfZW1wdHkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoID09PSAwO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfc3RvcmUoc3RvcmUsIG5hbWUpIHtcbiAgICBpZiAoc3RvcmUgIT0gbnVsbCAmJiB0eXBlb2Ygc3RvcmUuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgJyR7bmFtZX0nIGlzIG5vdCBhIHN0b3JlIHdpdGggYSAnc3Vic2NyaWJlJyBtZXRob2RgKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzdWJzY3JpYmUoc3RvcmUsIC4uLmNhbGxiYWNrcykge1xuICAgIGlmIChzdG9yZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBub29wO1xuICAgIH1cbiAgICBjb25zdCB1bnN1YiA9IHN0b3JlLnN1YnNjcmliZSguLi5jYWxsYmFja3MpO1xuICAgIHJldHVybiB1bnN1Yi51bnN1YnNjcmliZSA/ICgpID0+IHVuc3ViLnVuc3Vic2NyaWJlKCkgOiB1bnN1Yjtcbn1cbmZ1bmN0aW9uIGdldF9zdG9yZV92YWx1ZShzdG9yZSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBzdWJzY3JpYmUoc3RvcmUsIF8gPT4gdmFsdWUgPSBfKSgpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudF9zdWJzY3JpYmUoY29tcG9uZW50LCBzdG9yZSwgY2FsbGJhY2spIHtcbiAgICBjb21wb25lbnQuJCQub25fZGVzdHJveS5wdXNoKHN1YnNjcmliZShzdG9yZSwgY2FsbGJhY2spKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9zbG90KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvbikge1xuICAgICAgICBjb25zdCBzbG90X2N0eCA9IGdldF9zbG90X2NvbnRleHQoZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBmbik7XG4gICAgICAgIHJldHVybiBkZWZpbml0aW9uWzBdKHNsb3RfY3R4KTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRfc2xvdF9jb250ZXh0KGRlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZm4pIHtcbiAgICByZXR1cm4gZGVmaW5pdGlvblsxXSAmJiBmblxuICAgICAgICA/IGFzc2lnbigkJHNjb3BlLmN0eC5zbGljZSgpLCBkZWZpbml0aW9uWzFdKGZuKGN0eCkpKVxuICAgICAgICA6ICQkc2NvcGUuY3R4O1xufVxuZnVuY3Rpb24gZ2V0X3Nsb3RfY2hhbmdlcyhkZWZpbml0aW9uLCAkJHNjb3BlLCBkaXJ0eSwgZm4pIHtcbiAgICBpZiAoZGVmaW5pdGlvblsyXSAmJiBmbikge1xuICAgICAgICBjb25zdCBsZXRzID0gZGVmaW5pdGlvblsyXShmbihkaXJ0eSkpO1xuICAgICAgICBpZiAoJCRzY29wZS5kaXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbGV0cztcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGxldHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWQgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IGxlbiA9IE1hdGgubWF4KCQkc2NvcGUuZGlydHkubGVuZ3RoLCBsZXRzLmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkW2ldID0gJCRzY29wZS5kaXJ0eVtpXSB8IGxldHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbWVyZ2VkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkJHNjb3BlLmRpcnR5IHwgbGV0cztcbiAgICB9XG4gICAgcmV0dXJuICQkc2NvcGUuZGlydHk7XG59XG5mdW5jdGlvbiB1cGRhdGVfc2xvdChzbG90LCBzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4sIGdldF9zbG90X2NvbnRleHRfZm4pIHtcbiAgICBjb25zdCBzbG90X2NoYW5nZXMgPSBnZXRfc2xvdF9jaGFuZ2VzKHNsb3RfZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4pO1xuICAgIGlmIChzbG90X2NoYW5nZXMpIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dChzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG4gICAgICAgIHNsb3QucChzbG90X2NvbnRleHQsIHNsb3RfY2hhbmdlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlX3Nsb3Rfc3ByZWFkKHNsb3QsIHNsb3RfZGVmaW5pdGlvbiwgY3R4LCAkJHNjb3BlLCBkaXJ0eSwgZ2V0X3Nsb3RfY2hhbmdlc19mbiwgZ2V0X3Nsb3Rfc3ByZWFkX2NoYW5nZXNfZm4sIGdldF9zbG90X2NvbnRleHRfZm4pIHtcbiAgICBjb25zdCBzbG90X2NoYW5nZXMgPSBnZXRfc2xvdF9zcHJlYWRfY2hhbmdlc19mbihkaXJ0eSkgfCBnZXRfc2xvdF9jaGFuZ2VzKHNsb3RfZGVmaW5pdGlvbiwgJCRzY29wZSwgZGlydHksIGdldF9zbG90X2NoYW5nZXNfZm4pO1xuICAgIGlmIChzbG90X2NoYW5nZXMpIHtcbiAgICAgICAgY29uc3Qgc2xvdF9jb250ZXh0ID0gZ2V0X3Nsb3RfY29udGV4dChzbG90X2RlZmluaXRpb24sIGN0eCwgJCRzY29wZSwgZ2V0X3Nsb3RfY29udGV4dF9mbik7XG4gICAgICAgIHNsb3QucChzbG90X2NvbnRleHQsIHNsb3RfY2hhbmdlcyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZXhjbHVkZV9pbnRlcm5hbF9wcm9wcyhwcm9wcykge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgIGZvciAoY29uc3QgayBpbiBwcm9wcylcbiAgICAgICAgaWYgKGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3VsdFtrXSA9IHByb3BzW2tdO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBjb21wdXRlX3Jlc3RfcHJvcHMocHJvcHMsIGtleXMpIHtcbiAgICBjb25zdCByZXN0ID0ge307XG4gICAga2V5cyA9IG5ldyBTZXQoa2V5cyk7XG4gICAgZm9yIChjb25zdCBrIGluIHByb3BzKVxuICAgICAgICBpZiAoIWtleXMuaGFzKGspICYmIGtbMF0gIT09ICckJylcbiAgICAgICAgICAgIHJlc3Rba10gPSBwcm9wc1trXTtcbiAgICByZXR1cm4gcmVzdDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVfc2xvdHMoc2xvdHMpIHtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzbG90cykge1xuICAgICAgICByZXN1bHRba2V5XSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBvbmNlKGZuKSB7XG4gICAgbGV0IHJhbiA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgICAgICBpZiAocmFuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByYW4gPSB0cnVlO1xuICAgICAgICBmbi5jYWxsKHRoaXMsIC4uLmFyZ3MpO1xuICAgIH07XG59XG5mdW5jdGlvbiBudWxsX3RvX2VtcHR5KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IHZhbHVlO1xufVxuZnVuY3Rpb24gc2V0X3N0b3JlX3ZhbHVlKHN0b3JlLCByZXQsIHZhbHVlID0gcmV0KSB7XG4gICAgc3RvcmUuc2V0KHZhbHVlKTtcbiAgICByZXR1cm4gcmV0O1xufVxuY29uc3QgaGFzX3Byb3AgPSAob2JqLCBwcm9wKSA9PiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbmZ1bmN0aW9uIGFjdGlvbl9kZXN0cm95ZXIoYWN0aW9uX3Jlc3VsdCkge1xuICAgIHJldHVybiBhY3Rpb25fcmVzdWx0ICYmIGlzX2Z1bmN0aW9uKGFjdGlvbl9yZXN1bHQuZGVzdHJveSkgPyBhY3Rpb25fcmVzdWx0LmRlc3Ryb3kgOiBub29wO1xufVxuXG5jb25zdCBpc19jbGllbnQgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJztcbmxldCBub3cgPSBpc19jbGllbnRcbiAgICA/ICgpID0+IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKVxuICAgIDogKCkgPT4gRGF0ZS5ub3coKTtcbmxldCByYWYgPSBpc19jbGllbnQgPyBjYiA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2IpIDogbm9vcDtcbi8vIHVzZWQgaW50ZXJuYWxseSBmb3IgdGVzdGluZ1xuZnVuY3Rpb24gc2V0X25vdyhmbikge1xuICAgIG5vdyA9IGZuO1xufVxuZnVuY3Rpb24gc2V0X3JhZihmbikge1xuICAgIHJhZiA9IGZuO1xufVxuXG5jb25zdCB0YXNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIHJ1bl90YXNrcyhub3cpIHtcbiAgICB0YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICBpZiAoIXRhc2suYyhub3cpKSB7XG4gICAgICAgICAgICB0YXNrcy5kZWxldGUodGFzayk7XG4gICAgICAgICAgICB0YXNrLmYoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0YXNrcy5zaXplICE9PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seSFcbiAqL1xuZnVuY3Rpb24gY2xlYXJfbG9vcHMoKSB7XG4gICAgdGFza3MuY2xlYXIoKTtcbn1cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB0YXNrIHRoYXQgcnVucyBvbiBlYWNoIHJhZiBmcmFtZVxuICogdW50aWwgaXQgcmV0dXJucyBhIGZhbHN5IHZhbHVlIG9yIGlzIGFib3J0ZWRcbiAqL1xuZnVuY3Rpb24gbG9vcChjYWxsYmFjaykge1xuICAgIGxldCB0YXNrO1xuICAgIGlmICh0YXNrcy5zaXplID09PSAwKVxuICAgICAgICByYWYocnVuX3Rhc2tzKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9taXNlOiBuZXcgUHJvbWlzZShmdWxmaWxsID0+IHtcbiAgICAgICAgICAgIHRhc2tzLmFkZCh0YXNrID0geyBjOiBjYWxsYmFjaywgZjogZnVsZmlsbCB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIGFib3J0KCkge1xuICAgICAgICAgICAgdGFza3MuZGVsZXRlKHRhc2spO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kKHRhcmdldCwgbm9kZSkge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydCh0YXJnZXQsIG5vZGUsIGFuY2hvcikge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUobm9kZSwgYW5jaG9yIHx8IG51bGwpO1xufVxuZnVuY3Rpb24gZGV0YWNoKG5vZGUpIHtcbiAgICBub2RlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2VhY2goaXRlcmF0aW9ucywgZGV0YWNoaW5nKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVyYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChpdGVyYXRpb25zW2ldKVxuICAgICAgICAgICAgaXRlcmF0aW9uc1tpXS5kKGRldGFjaGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XG59XG5mdW5jdGlvbiBlbGVtZW50X2lzKG5hbWUsIGlzKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSwgeyBpcyB9KTtcbn1cbmZ1bmN0aW9uIG9iamVjdF93aXRob3V0X3Byb3BlcnRpZXMob2JqLCBleGNsdWRlKSB7XG4gICAgY29uc3QgdGFyZ2V0ID0ge307XG4gICAgZm9yIChjb25zdCBrIGluIG9iaikge1xuICAgICAgICBpZiAoaGFzX3Byb3Aob2JqLCBrKVxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgJiYgZXhjbHVkZS5pbmRleE9mKGspID09PSAtMSkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGFyZ2V0W2tdID0gb2JqW2tdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBzdmdfZWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbmZ1bmN0aW9uIHRleHQoZGF0YSkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbn1cbmZ1bmN0aW9uIHNwYWNlKCkge1xuICAgIHJldHVybiB0ZXh0KCcgJyk7XG59XG5mdW5jdGlvbiBlbXB0eSgpIHtcbiAgICByZXR1cm4gdGV4dCgnJyk7XG59XG5mdW5jdGlvbiBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiBub2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcHJldmVudF9kZWZhdWx0KGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gc3RvcF9wcm9wYWdhdGlvbihmbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG59XG5mdW5jdGlvbiBzZWxmKGZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMpXG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpXG4gICAgICAgIG5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgZWxzZSBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKSAhPT0gdmFsdWUpXG4gICAgICAgIG5vZGUuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gc2V0X2F0dHJpYnV0ZXMobm9kZSwgYXR0cmlidXRlcykge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG5vZGUuX19wcm90b19fKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUuY3NzVGV4dCA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdfX3ZhbHVlJykge1xuICAgICAgICAgICAgbm9kZS52YWx1ZSA9IG5vZGVba2V5XSA9IGF0dHJpYnV0ZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkZXNjcmlwdG9yc1trZXldICYmIGRlc2NyaXB0b3JzW2tleV0uc2V0KSB7XG4gICAgICAgICAgICBub2RlW2tleV0gPSBhdHRyaWJ1dGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHNldF9zdmdfYXR0cmlidXRlcyhub2RlLCBhdHRyaWJ1dGVzKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYXR0cmlidXRlcykge1xuICAgICAgICBhdHRyKG5vZGUsIGtleSwgYXR0cmlidXRlc1trZXldKTtcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfY3VzdG9tX2VsZW1lbnRfZGF0YShub2RlLCBwcm9wLCB2YWx1ZSkge1xuICAgIGlmIChwcm9wIGluIG5vZGUpIHtcbiAgICAgICAgbm9kZVtwcm9wXSA9IHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0cihub2RlLCBwcm9wLCB2YWx1ZSk7XG4gICAgfVxufVxuZnVuY3Rpb24geGxpbmtfYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgbm9kZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsIGF0dHJpYnV0ZSwgdmFsdWUpO1xufVxuZnVuY3Rpb24gZ2V0X2JpbmRpbmdfZ3JvdXBfdmFsdWUoZ3JvdXAsIF9fdmFsdWUsIGNoZWNrZWQpIHtcbiAgICBjb25zdCB2YWx1ZSA9IG5ldyBTZXQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChncm91cFtpXS5jaGVja2VkKVxuICAgICAgICAgICAgdmFsdWUuYWRkKGdyb3VwW2ldLl9fdmFsdWUpO1xuICAgIH1cbiAgICBpZiAoIWNoZWNrZWQpIHtcbiAgICAgICAgdmFsdWUuZGVsZXRlKF9fdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh2YWx1ZSk7XG59XG5mdW5jdGlvbiB0b19udW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnID8gbnVsbCA6ICt2YWx1ZTtcbn1cbmZ1bmN0aW9uIHRpbWVfcmFuZ2VzX3RvX2FycmF5KHJhbmdlcykge1xuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXJyYXkucHVzaCh7IHN0YXJ0OiByYW5nZXMuc3RhcnQoaSksIGVuZDogcmFuZ2VzLmVuZChpKSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5O1xufVxuZnVuY3Rpb24gY2hpbGRyZW4oZWxlbWVudCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGROb2Rlcyk7XG59XG5mdW5jdGlvbiBjbGFpbV9lbGVtZW50KG5vZGVzLCBuYW1lLCBhdHRyaWJ1dGVzLCBzdmcpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBub2Rlc1tpXTtcbiAgICAgICAgaWYgKG5vZGUubm9kZU5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICAgIGxldCBqID0gMDtcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlID0gbm9kZS5hdHRyaWJ1dGVzW2orK107XG4gICAgICAgICAgICAgICAgaWYgKCFhdHRyaWJ1dGVzW2F0dHJpYnV0ZS5uYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmUucHVzaChhdHRyaWJ1dGUubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgayA9IDA7IGsgPCByZW1vdmUubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShyZW1vdmVba10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3ZnID8gc3ZnX2VsZW1lbnQobmFtZSkgOiBlbGVtZW50KG5hbWUpO1xufVxuZnVuY3Rpb24gY2xhaW1fdGV4dChub2RlcywgZGF0YSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gJycgKyBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzLnNwbGljZShpLCAxKVswXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGV4dChkYXRhKTtcbn1cbmZ1bmN0aW9uIGNsYWltX3NwYWNlKG5vZGVzKSB7XG4gICAgcmV0dXJuIGNsYWltX3RleHQobm9kZXMsICcgJyk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YSh0ZXh0LCBkYXRhKSB7XG4gICAgZGF0YSA9ICcnICsgZGF0YTtcbiAgICBpZiAodGV4dC53aG9sZVRleHQgIT09IGRhdGEpXG4gICAgICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiBzZXRfaW5wdXRfdmFsdWUoaW5wdXQsIHZhbHVlKSB7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gJycgOiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHNldF9pbnB1dF90eXBlKGlucHV0LCB0eXBlKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaW5wdXQudHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICB9XG59XG5mdW5jdGlvbiBzZXRfc3R5bGUobm9kZSwga2V5LCB2YWx1ZSwgaW1wb3J0YW50KSB7XG4gICAgbm9kZS5zdHlsZS5zZXRQcm9wZXJ0eShrZXksIHZhbHVlLCBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnKTtcbn1cbmZ1bmN0aW9uIHNlbGVjdF9vcHRpb24oc2VsZWN0LCB2YWx1ZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0Lm9wdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uID0gc2VsZWN0Lm9wdGlvbnNbaV07XG4gICAgICAgIGlmIChvcHRpb24uX192YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzZWxlY3Rfb3B0aW9ucyhzZWxlY3QsIHZhbHVlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzZWxlY3Qub3B0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBvcHRpb24gPSBzZWxlY3Qub3B0aW9uc1tpXTtcbiAgICAgICAgb3B0aW9uLnNlbGVjdGVkID0gfnZhbHVlLmluZGV4T2Yob3B0aW9uLl9fdmFsdWUpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHNlbGVjdF92YWx1ZShzZWxlY3QpIHtcbiAgICBjb25zdCBzZWxlY3RlZF9vcHRpb24gPSBzZWxlY3QucXVlcnlTZWxlY3RvcignOmNoZWNrZWQnKSB8fCBzZWxlY3Qub3B0aW9uc1swXTtcbiAgICByZXR1cm4gc2VsZWN0ZWRfb3B0aW9uICYmIHNlbGVjdGVkX29wdGlvbi5fX3ZhbHVlO1xufVxuZnVuY3Rpb24gc2VsZWN0X211bHRpcGxlX3ZhbHVlKHNlbGVjdCkge1xuICAgIHJldHVybiBbXS5tYXAuY2FsbChzZWxlY3QucXVlcnlTZWxlY3RvckFsbCgnOmNoZWNrZWQnKSwgb3B0aW9uID0+IG9wdGlvbi5fX3ZhbHVlKTtcbn1cbi8vIHVuZm9ydHVuYXRlbHkgdGhpcyBjYW4ndCBiZSBhIGNvbnN0YW50IGFzIHRoYXQgd291bGRuJ3QgYmUgdHJlZS1zaGFrZWFibGVcbi8vIHNvIHdlIGNhY2hlIHRoZSByZXN1bHQgaW5zdGVhZFxubGV0IGNyb3Nzb3JpZ2luO1xuZnVuY3Rpb24gaXNfY3Jvc3NvcmlnaW4oKSB7XG4gICAgaWYgKGNyb3Nzb3JpZ2luID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY3Jvc3NvcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgdm9pZCB3aW5kb3cucGFyZW50LmRvY3VtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY3Jvc3NvcmlnaW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjcm9zc29yaWdpbjtcbn1cbmZ1bmN0aW9uIGFkZF9yZXNpemVfbGlzdGVuZXIobm9kZSwgZm4pIHtcbiAgICBjb25zdCBjb21wdXRlZF9zdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3Qgel9pbmRleCA9IChwYXJzZUludChjb21wdXRlZF9zdHlsZS56SW5kZXgpIHx8IDApIC0gMTtcbiAgICBpZiAoY29tcHV0ZWRfc3R5bGUucG9zaXRpb24gPT09ICdzdGF0aWMnKSB7XG4gICAgICAgIG5vZGUuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIH1cbiAgICBjb25zdCBpZnJhbWUgPSBlbGVtZW50KCdpZnJhbWUnKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5OiBibG9jazsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7ICcgK1xuICAgICAgICBgb3ZlcmZsb3c6IGhpZGRlbjsgYm9yZGVyOiAwOyBvcGFjaXR5OiAwOyBwb2ludGVyLWV2ZW50czogbm9uZTsgei1pbmRleDogJHt6X2luZGV4fTtgKTtcbiAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgaWZyYW1lLnRhYkluZGV4ID0gLTE7XG4gICAgY29uc3QgY3Jvc3NvcmlnaW4gPSBpc19jcm9zc29yaWdpbigpO1xuICAgIGxldCB1bnN1YnNjcmliZTtcbiAgICBpZiAoY3Jvc3NvcmlnaW4pIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9IFwiZGF0YTp0ZXh0L2h0bWwsPHNjcmlwdD5vbnJlc2l6ZT1mdW5jdGlvbigpe3BhcmVudC5wb3N0TWVzc2FnZSgwLCcqJyl9PC9zY3JpcHQ+XCI7XG4gICAgICAgIHVuc3Vic2NyaWJlID0gbGlzdGVuKHdpbmRvdywgJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGlmcmFtZS5jb250ZW50V2luZG93KVxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWZyYW1lLnNyYyA9ICdhYm91dDpibGFuayc7XG4gICAgICAgIGlmcmFtZS5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSA9IGxpc3RlbihpZnJhbWUuY29udGVudFdpbmRvdywgJ3Jlc2l6ZScsIGZuKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgYXBwZW5kKG5vZGUsIGlmcmFtZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKGNyb3Nzb3JpZ2luKSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVuc3Vic2NyaWJlICYmIGlmcmFtZS5jb250ZW50V2luZG93KSB7XG4gICAgICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGRldGFjaChpZnJhbWUpO1xuICAgIH07XG59XG5mdW5jdGlvbiB0b2dnbGVfY2xhc3MoZWxlbWVudCwgbmFtZSwgdG9nZ2xlKSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3RbdG9nZ2xlID8gJ2FkZCcgOiAncmVtb3ZlJ10obmFtZSk7XG59XG5mdW5jdGlvbiBjdXN0b21fZXZlbnQodHlwZSwgZGV0YWlsKSB7XG4gICAgY29uc3QgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGUuaW5pdEN1c3RvbUV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSwgZGV0YWlsKTtcbiAgICByZXR1cm4gZTtcbn1cbmZ1bmN0aW9uIHF1ZXJ5X3NlbGVjdG9yX2FsbChzZWxlY3RvciwgcGFyZW50ID0gZG9jdW1lbnQuYm9keSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSk7XG59XG5jbGFzcyBIdG1sVGFnIHtcbiAgICBjb25zdHJ1Y3RvcihhbmNob3IgPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYSA9IGFuY2hvcjtcbiAgICAgICAgdGhpcy5lID0gdGhpcy5uID0gbnVsbDtcbiAgICB9XG4gICAgbShodG1sLCB0YXJnZXQsIGFuY2hvciA9IG51bGwpIHtcbiAgICAgICAgaWYgKCF0aGlzLmUpIHtcbiAgICAgICAgICAgIHRoaXMuZSA9IGVsZW1lbnQodGFyZ2V0Lm5vZGVOYW1lKTtcbiAgICAgICAgICAgIHRoaXMudCA9IHRhcmdldDtcbiAgICAgICAgICAgIHRoaXMuaChodG1sKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmkoYW5jaG9yKTtcbiAgICB9XG4gICAgaChodG1sKSB7XG4gICAgICAgIHRoaXMuZS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB0aGlzLm4gPSBBcnJheS5mcm9tKHRoaXMuZS5jaGlsZE5vZGVzKTtcbiAgICB9XG4gICAgaShhbmNob3IpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm4ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIGluc2VydCh0aGlzLnQsIHRoaXMubltpXSwgYW5jaG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwKGh0bWwpIHtcbiAgICAgICAgdGhpcy5kKCk7XG4gICAgICAgIHRoaXMuaChodG1sKTtcbiAgICAgICAgdGhpcy5pKHRoaXMuYSk7XG4gICAgfVxuICAgIGQoKSB7XG4gICAgICAgIHRoaXMubi5mb3JFYWNoKGRldGFjaCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXR0cmlidXRlX3RvX29iamVjdChhdHRyaWJ1dGVzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZm9yIChjb25zdCBhdHRyaWJ1dGUgb2YgYXR0cmlidXRlcykge1xuICAgICAgICByZXN1bHRbYXR0cmlidXRlLm5hbWVdID0gYXR0cmlidXRlLnZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0X2N1c3RvbV9lbGVtZW50c19zbG90cyhlbGVtZW50KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgZWxlbWVudC5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgcmVzdWx0W25vZGUuc2xvdCB8fCAnZGVmYXVsdCddID0gdHJ1ZTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5jb25zdCBhY3RpdmVfZG9jcyA9IG5ldyBTZXQoKTtcbmxldCBhY3RpdmUgPSAwO1xuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Rhcmtza3lhcHAvc3RyaW5nLWhhc2gvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmZ1bmN0aW9uIGhhc2goc3RyKSB7XG4gICAgbGV0IGhhc2ggPSA1MzgxO1xuICAgIGxldCBpID0gc3RyLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgXiBzdHIuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9ydWxlKG5vZGUsIGEsIGIsIGR1cmF0aW9uLCBkZWxheSwgZWFzZSwgZm4sIHVpZCA9IDApIHtcbiAgICBjb25zdCBzdGVwID0gMTYuNjY2IC8gZHVyYXRpb247XG4gICAgbGV0IGtleWZyYW1lcyA9ICd7XFxuJztcbiAgICBmb3IgKGxldCBwID0gMDsgcCA8PSAxOyBwICs9IHN0ZXApIHtcbiAgICAgICAgY29uc3QgdCA9IGEgKyAoYiAtIGEpICogZWFzZShwKTtcbiAgICAgICAga2V5ZnJhbWVzICs9IHAgKiAxMDAgKyBgJXske2ZuKHQsIDEgLSB0KX19XFxuYDtcbiAgICB9XG4gICAgY29uc3QgcnVsZSA9IGtleWZyYW1lcyArIGAxMDAlIHske2ZuKGIsIDEgLSBiKX19XFxufWA7XG4gICAgY29uc3QgbmFtZSA9IGBfX3N2ZWx0ZV8ke2hhc2gocnVsZSl9XyR7dWlkfWA7XG4gICAgY29uc3QgZG9jID0gbm9kZS5vd25lckRvY3VtZW50O1xuICAgIGFjdGl2ZV9kb2NzLmFkZChkb2MpO1xuICAgIGNvbnN0IHN0eWxlc2hlZXQgPSBkb2MuX19zdmVsdGVfc3R5bGVzaGVldCB8fCAoZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQgPSBkb2MuaGVhZC5hcHBlbmRDaGlsZChlbGVtZW50KCdzdHlsZScpKS5zaGVldCk7XG4gICAgY29uc3QgY3VycmVudF9ydWxlcyA9IGRvYy5fX3N2ZWx0ZV9ydWxlcyB8fCAoZG9jLl9fc3ZlbHRlX3J1bGVzID0ge30pO1xuICAgIGlmICghY3VycmVudF9ydWxlc1tuYW1lXSkge1xuICAgICAgICBjdXJyZW50X3J1bGVzW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgc3R5bGVzaGVldC5pbnNlcnRSdWxlKGBAa2V5ZnJhbWVzICR7bmFtZX0gJHtydWxlfWAsIHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3QgYW5pbWF0aW9uID0gbm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJyc7XG4gICAgbm9kZS5zdHlsZS5hbmltYXRpb24gPSBgJHthbmltYXRpb24gPyBgJHthbmltYXRpb259LCBgIDogJyd9JHtuYW1lfSAke2R1cmF0aW9ufW1zIGxpbmVhciAke2RlbGF5fW1zIDEgYm90aGA7XG4gICAgYWN0aXZlICs9IDE7XG4gICAgcmV0dXJuIG5hbWU7XG59XG5mdW5jdGlvbiBkZWxldGVfcnVsZShub2RlLCBuYW1lKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSAobm9kZS5zdHlsZS5hbmltYXRpb24gfHwgJycpLnNwbGl0KCcsICcpO1xuICAgIGNvbnN0IG5leHQgPSBwcmV2aW91cy5maWx0ZXIobmFtZVxuICAgICAgICA/IGFuaW0gPT4gYW5pbS5pbmRleE9mKG5hbWUpIDwgMCAvLyByZW1vdmUgc3BlY2lmaWMgYW5pbWF0aW9uXG4gICAgICAgIDogYW5pbSA9PiBhbmltLmluZGV4T2YoJ19fc3ZlbHRlJykgPT09IC0xIC8vIHJlbW92ZSBhbGwgU3ZlbHRlIGFuaW1hdGlvbnNcbiAgICApO1xuICAgIGNvbnN0IGRlbGV0ZWQgPSBwcmV2aW91cy5sZW5ndGggLSBuZXh0Lmxlbmd0aDtcbiAgICBpZiAoZGVsZXRlZCkge1xuICAgICAgICBub2RlLnN0eWxlLmFuaW1hdGlvbiA9IG5leHQuam9pbignLCAnKTtcbiAgICAgICAgYWN0aXZlIC09IGRlbGV0ZWQ7XG4gICAgICAgIGlmICghYWN0aXZlKVxuICAgICAgICAgICAgY2xlYXJfcnVsZXMoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhcl9ydWxlcygpIHtcbiAgICByYWYoKCkgPT4ge1xuICAgICAgICBpZiAoYWN0aXZlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBhY3RpdmVfZG9jcy5mb3JFYWNoKGRvYyA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXNoZWV0ID0gZG9jLl9fc3ZlbHRlX3N0eWxlc2hlZXQ7XG4gICAgICAgICAgICBsZXQgaSA9IHN0eWxlc2hlZXQuY3NzUnVsZXMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSlcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0LmRlbGV0ZVJ1bGUoaSk7XG4gICAgICAgICAgICBkb2MuX19zdmVsdGVfcnVsZXMgPSB7fTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFjdGl2ZV9kb2NzLmNsZWFyKCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZV9hbmltYXRpb24obm9kZSwgZnJvbSwgZm4sIHBhcmFtcykge1xuICAgIGlmICghZnJvbSlcbiAgICAgICAgcmV0dXJuIG5vb3A7XG4gICAgY29uc3QgdG8gPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmIChmcm9tLmxlZnQgPT09IHRvLmxlZnQgJiYgZnJvbS5yaWdodCA9PT0gdG8ucmlnaHQgJiYgZnJvbS50b3AgPT09IHRvLnRvcCAmJiBmcm9tLmJvdHRvbSA9PT0gdG8uYm90dG9tKVxuICAgICAgICByZXR1cm4gbm9vcDtcbiAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCBcbiAgICAvLyBAdHMtaWdub3JlIHRvZG86IHNob3VsZCB0aGlzIGJlIHNlcGFyYXRlZCBmcm9tIGRlc3RydWN0dXJpbmc/IE9yIHN0YXJ0L2VuZCBhZGRlZCB0byBwdWJsaWMgYXBpIGFuZCBkb2N1bWVudGF0aW9uP1xuICAgIHN0YXJ0OiBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheSwgXG4gICAgLy8gQHRzLWlnbm9yZSB0b2RvOlxuICAgIGVuZCA9IHN0YXJ0X3RpbWUgKyBkdXJhdGlvbiwgdGljayA9IG5vb3AsIGNzcyB9ID0gZm4obm9kZSwgeyBmcm9tLCB0byB9LCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIGxldCBuYW1lO1xuICAgIGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgICAgICBpZiAoY3NzKSB7XG4gICAgICAgICAgICBuYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkZWxheSkge1xuICAgICAgICAgICAgc3RhcnRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIG5hbWUpO1xuICAgICAgICBydW5uaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgaWYgKCFzdGFydGVkICYmIG5vdyA+PSBzdGFydF90aW1lKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRlZCAmJiBub3cgPj0gZW5kKSB7XG4gICAgICAgICAgICB0aWNrKDEsIDApO1xuICAgICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcnVubmluZykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgICAgICBjb25zdCBwID0gbm93IC0gc3RhcnRfdGltZTtcbiAgICAgICAgICAgIGNvbnN0IHQgPSAwICsgMSAqIGVhc2luZyhwIC8gZHVyYXRpb24pO1xuICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgc3RhcnQoKTtcbiAgICB0aWNrKDAsIDEpO1xuICAgIHJldHVybiBzdG9wO1xufVxuZnVuY3Rpb24gZml4X3Bvc2l0aW9uKG5vZGUpIHtcbiAgICBjb25zdCBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgaWYgKHN0eWxlLnBvc2l0aW9uICE9PSAnYWJzb2x1dGUnICYmIHN0eWxlLnBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XG4gICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCB9ID0gc3R5bGU7XG4gICAgICAgIGNvbnN0IGEgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBub2RlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgbm9kZS5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICBub2RlLnN0eWxlLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgYWRkX3RyYW5zZm9ybShub2RlLCBhKTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRfdHJhbnNmb3JtKG5vZGUsIGEpIHtcbiAgICBjb25zdCBiID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBpZiAoYS5sZWZ0ICE9PSBiLmxlZnQgfHwgYS50b3AgIT09IGIudG9wKSB7XG4gICAgICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtID0gc3R5bGUudHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IHN0eWxlLnRyYW5zZm9ybTtcbiAgICAgICAgbm9kZS5zdHlsZS50cmFuc2Zvcm0gPSBgJHt0cmFuc2Zvcm19IHRyYW5zbGF0ZSgke2EubGVmdCAtIGIubGVmdH1weCwgJHthLnRvcCAtIGIudG9wfXB4KWA7XG4gICAgfVxufVxuXG5sZXQgY3VycmVudF9jb21wb25lbnQ7XG5mdW5jdGlvbiBzZXRfY3VycmVudF9jb21wb25lbnQoY29tcG9uZW50KSB7XG4gICAgY3VycmVudF9jb21wb25lbnQgPSBjb21wb25lbnQ7XG59XG5mdW5jdGlvbiBnZXRfY3VycmVudF9jb21wb25lbnQoKSB7XG4gICAgaWYgKCFjdXJyZW50X2NvbXBvbmVudClcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGdW5jdGlvbiBjYWxsZWQgb3V0c2lkZSBjb21wb25lbnQgaW5pdGlhbGl6YXRpb24nKTtcbiAgICByZXR1cm4gY3VycmVudF9jb21wb25lbnQ7XG59XG5mdW5jdGlvbiBiZWZvcmVVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5iZWZvcmVfdXBkYXRlLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gb25Nb3VudChmbikge1xuICAgIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLm9uX21vdW50LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWZ0ZXJVcGRhdGUoZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5hZnRlcl91cGRhdGUucHVzaChmbik7XG59XG5mdW5jdGlvbiBvbkRlc3Ryb3koZm4pIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5vbl9kZXN0cm95LnB1c2goZm4pO1xufVxuZnVuY3Rpb24gY3JlYXRlRXZlbnREaXNwYXRjaGVyKCkge1xuICAgIGNvbnN0IGNvbXBvbmVudCA9IGdldF9jdXJyZW50X2NvbXBvbmVudCgpO1xuICAgIHJldHVybiAodHlwZSwgZGV0YWlsKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrcyA9IGNvbXBvbmVudC4kJC5jYWxsYmFja3NbdHlwZV07XG4gICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gYXJlIHRoZXJlIHNpdHVhdGlvbnMgd2hlcmUgZXZlbnRzIGNvdWxkIGJlIGRpc3BhdGNoZWRcbiAgICAgICAgICAgIC8vIGluIGEgc2VydmVyIChub24tRE9NKSBlbnZpcm9ubWVudD9cbiAgICAgICAgICAgIGNvbnN0IGV2ZW50ID0gY3VzdG9tX2V2ZW50KHR5cGUsIGRldGFpbCk7XG4gICAgICAgICAgICBjYWxsYmFja3Muc2xpY2UoKS5mb3JFYWNoKGZuID0+IHtcbiAgICAgICAgICAgICAgICBmbi5jYWxsKGNvbXBvbmVudCwgZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gc2V0Q29udGV4dChrZXksIGNvbnRleHQpIHtcbiAgICBnZXRfY3VycmVudF9jb21wb25lbnQoKS4kJC5jb250ZXh0LnNldChrZXksIGNvbnRleHQpO1xufVxuZnVuY3Rpb24gZ2V0Q29udGV4dChrZXkpIHtcbiAgICByZXR1cm4gZ2V0X2N1cnJlbnRfY29tcG9uZW50KCkuJCQuY29udGV4dC5nZXQoa2V5KTtcbn1cbmZ1bmN0aW9uIGhhc0NvbnRleHQoa2V5KSB7XG4gICAgcmV0dXJuIGdldF9jdXJyZW50X2NvbXBvbmVudCgpLiQkLmNvbnRleHQuaGFzKGtleSk7XG59XG4vLyBUT0RPIGZpZ3VyZSBvdXQgaWYgd2Ugc3RpbGwgd2FudCB0byBzdXBwb3J0XG4vLyBzaG9ydGhhbmQgZXZlbnRzLCBvciBpZiB3ZSB3YW50IHRvIGltcGxlbWVudFxuLy8gYSByZWFsIGJ1YmJsaW5nIG1lY2hhbmlzbVxuZnVuY3Rpb24gYnViYmxlKGNvbXBvbmVudCwgZXZlbnQpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSBjb21wb25lbnQuJCQuY2FsbGJhY2tzW2V2ZW50LnR5cGVdO1xuICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgY2FsbGJhY2tzLnNsaWNlKCkuZm9yRWFjaChmbiA9PiBmbihldmVudCkpO1xuICAgIH1cbn1cblxuY29uc3QgZGlydHlfY29tcG9uZW50cyA9IFtdO1xuY29uc3QgaW50cm9zID0geyBlbmFibGVkOiBmYWxzZSB9O1xuY29uc3QgYmluZGluZ19jYWxsYmFja3MgPSBbXTtcbmNvbnN0IHJlbmRlcl9jYWxsYmFja3MgPSBbXTtcbmNvbnN0IGZsdXNoX2NhbGxiYWNrcyA9IFtdO1xuY29uc3QgcmVzb2x2ZWRfcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpO1xubGV0IHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbmZ1bmN0aW9uIHNjaGVkdWxlX3VwZGF0ZSgpIHtcbiAgICBpZiAoIXVwZGF0ZV9zY2hlZHVsZWQpIHtcbiAgICAgICAgdXBkYXRlX3NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgIHJlc29sdmVkX3Byb21pc2UudGhlbihmbHVzaCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdGljaygpIHtcbiAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICByZXR1cm4gcmVzb2x2ZWRfcHJvbWlzZTtcbn1cbmZ1bmN0aW9uIGFkZF9yZW5kZXJfY2FsbGJhY2soZm4pIHtcbiAgICByZW5kZXJfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxuZnVuY3Rpb24gYWRkX2ZsdXNoX2NhbGxiYWNrKGZuKSB7XG4gICAgZmx1c2hfY2FsbGJhY2tzLnB1c2goZm4pO1xufVxubGV0IGZsdXNoaW5nID0gZmFsc2U7XG5jb25zdCBzZWVuX2NhbGxiYWNrcyA9IG5ldyBTZXQoKTtcbmZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIGlmIChmbHVzaGluZylcbiAgICAgICAgcmV0dXJuO1xuICAgIGZsdXNoaW5nID0gdHJ1ZTtcbiAgICBkbyB7XG4gICAgICAgIC8vIGZpcnN0LCBjYWxsIGJlZm9yZVVwZGF0ZSBmdW5jdGlvbnNcbiAgICAgICAgLy8gYW5kIHVwZGF0ZSBjb21wb25lbnRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGlydHlfY29tcG9uZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gZGlydHlfY29tcG9uZW50c1tpXTtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjb21wb25lbnQpO1xuICAgICAgICAgICAgdXBkYXRlKGNvbXBvbmVudC4kJCk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICBkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCA9IDA7XG4gICAgICAgIHdoaWxlIChiaW5kaW5nX2NhbGxiYWNrcy5sZW5ndGgpXG4gICAgICAgICAgICBiaW5kaW5nX2NhbGxiYWNrcy5wb3AoKSgpO1xuICAgICAgICAvLyB0aGVuLCBvbmNlIGNvbXBvbmVudHMgYXJlIHVwZGF0ZWQsIGNhbGxcbiAgICAgICAgLy8gYWZ0ZXJVcGRhdGUgZnVuY3Rpb25zLiBUaGlzIG1heSBjYXVzZVxuICAgICAgICAvLyBzdWJzZXF1ZW50IHVwZGF0ZXMuLi5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZW5kZXJfY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IHJlbmRlcl9jYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoIXNlZW5fY2FsbGJhY2tzLmhhcyhjYWxsYmFjaykpIHtcbiAgICAgICAgICAgICAgICAvLyAuLi5zbyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGxvb3BzXG4gICAgICAgICAgICAgICAgc2Vlbl9jYWxsYmFja3MuYWRkKGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlbmRlcl9jYWxsYmFja3MubGVuZ3RoID0gMDtcbiAgICB9IHdoaWxlIChkaXJ0eV9jb21wb25lbnRzLmxlbmd0aCk7XG4gICAgd2hpbGUgKGZsdXNoX2NhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICAgICAgZmx1c2hfY2FsbGJhY2tzLnBvcCgpKCk7XG4gICAgfVxuICAgIHVwZGF0ZV9zY2hlZHVsZWQgPSBmYWxzZTtcbiAgICBmbHVzaGluZyA9IGZhbHNlO1xuICAgIHNlZW5fY2FsbGJhY2tzLmNsZWFyKCk7XG59XG5mdW5jdGlvbiB1cGRhdGUoJCQpIHtcbiAgICBpZiAoJCQuZnJhZ21lbnQgIT09IG51bGwpIHtcbiAgICAgICAgJCQudXBkYXRlKCk7XG4gICAgICAgIHJ1bl9hbGwoJCQuYmVmb3JlX3VwZGF0ZSk7XG4gICAgICAgIGNvbnN0IGRpcnR5ID0gJCQuZGlydHk7XG4gICAgICAgICQkLmRpcnR5ID0gWy0xXTtcbiAgICAgICAgJCQuZnJhZ21lbnQgJiYgJCQuZnJhZ21lbnQucCgkJC5jdHgsIGRpcnR5KTtcbiAgICAgICAgJCQuYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG4gICAgfVxufVxuXG5sZXQgcHJvbWlzZTtcbmZ1bmN0aW9uIHdhaXQoKSB7XG4gICAgaWYgKCFwcm9taXNlKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHByb21pc2UgPSBudWxsO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5mdW5jdGlvbiBkaXNwYXRjaChub2RlLCBkaXJlY3Rpb24sIGtpbmQpIHtcbiAgICBub2RlLmRpc3BhdGNoRXZlbnQoY3VzdG9tX2V2ZW50KGAke2RpcmVjdGlvbiA/ICdpbnRybycgOiAnb3V0cm8nfSR7a2luZH1gKSk7XG59XG5jb25zdCBvdXRyb2luZyA9IG5ldyBTZXQoKTtcbmxldCBvdXRyb3M7XG5mdW5jdGlvbiBncm91cF9vdXRyb3MoKSB7XG4gICAgb3V0cm9zID0ge1xuICAgICAgICByOiAwLFxuICAgICAgICBjOiBbXSxcbiAgICAgICAgcDogb3V0cm9zIC8vIHBhcmVudCBncm91cFxuICAgIH07XG59XG5mdW5jdGlvbiBjaGVja19vdXRyb3MoKSB7XG4gICAgaWYgKCFvdXRyb3Mucikge1xuICAgICAgICBydW5fYWxsKG91dHJvcy5jKTtcbiAgICB9XG4gICAgb3V0cm9zID0gb3V0cm9zLnA7XG59XG5mdW5jdGlvbiB0cmFuc2l0aW9uX2luKGJsb2NrLCBsb2NhbCkge1xuICAgIGlmIChibG9jayAmJiBibG9jay5pKSB7XG4gICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XG4gICAgICAgIGJsb2NrLmkobG9jYWwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHRyYW5zaXRpb25fb3V0KGJsb2NrLCBsb2NhbCwgZGV0YWNoLCBjYWxsYmFjaykge1xuICAgIGlmIChibG9jayAmJiBibG9jay5vKSB7XG4gICAgICAgIGlmIChvdXRyb2luZy5oYXMoYmxvY2spKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBvdXRyb2luZy5hZGQoYmxvY2spO1xuICAgICAgICBvdXRyb3MuYy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgIG91dHJvaW5nLmRlbGV0ZShibG9jayk7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoZGV0YWNoKVxuICAgICAgICAgICAgICAgICAgICBibG9jay5kKDEpO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBibG9jay5vKGxvY2FsKTtcbiAgICB9XG59XG5jb25zdCBudWxsX3RyYW5zaXRpb24gPSB7IGR1cmF0aW9uOiAwIH07XG5mdW5jdGlvbiBjcmVhdGVfaW5fdHJhbnNpdGlvbihub2RlLCBmbiwgcGFyYW1zKSB7XG4gICAgbGV0IGNvbmZpZyA9IGZuKG5vZGUsIHBhcmFtcyk7XG4gICAgbGV0IHJ1bm5pbmcgPSBmYWxzZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgbGV0IHRhc2s7XG4gICAgbGV0IHVpZCA9IDA7XG4gICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSwgYW5pbWF0aW9uX25hbWUpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgaWYgKGNzcylcbiAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgMCwgMSwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcywgdWlkKyspO1xuICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICBjb25zdCBzdGFydF90aW1lID0gbm93KCkgKyBkZWxheTtcbiAgICAgICAgY29uc3QgZW5kX3RpbWUgPSBzdGFydF90aW1lICsgZHVyYXRpb247XG4gICAgICAgIGlmICh0YXNrKVxuICAgICAgICAgICAgdGFzay5hYm9ydCgpO1xuICAgICAgICBydW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgYWRkX3JlbmRlcl9jYWxsYmFjaygoKSA9PiBkaXNwYXRjaChub2RlLCB0cnVlLCAnc3RhcnQnKSk7XG4gICAgICAgIHRhc2sgPSBsb29wKG5vdyA9PiB7XG4gICAgICAgICAgICBpZiAocnVubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gZW5kX3RpbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgdHJ1ZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBydW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljayh0LCAxIC0gdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgc3RhcnRlZCA9IGZhbHNlO1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0KCkge1xuICAgICAgICAgICAgaWYgKHN0YXJ0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZGVsZXRlX3J1bGUobm9kZSk7XG4gICAgICAgICAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICAgICAgICAgIGNvbmZpZyA9IGNvbmZpZygpO1xuICAgICAgICAgICAgICAgIHdhaXQoKS50aGVuKGdvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWRhdGUoKSB7XG4gICAgICAgICAgICBzdGFydGVkID0gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgIHJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVfb3V0X3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcykge1xuICAgIGxldCBjb25maWcgPSBmbihub2RlLCBwYXJhbXMpO1xuICAgIGxldCBydW5uaW5nID0gdHJ1ZTtcbiAgICBsZXQgYW5pbWF0aW9uX25hbWU7XG4gICAgY29uc3QgZ3JvdXAgPSBvdXRyb3M7XG4gICAgZ3JvdXAuciArPSAxO1xuICAgIGZ1bmN0aW9uIGdvKCkge1xuICAgICAgICBjb25zdCB7IGRlbGF5ID0gMCwgZHVyYXRpb24gPSAzMDAsIGVhc2luZyA9IGlkZW50aXR5LCB0aWNrID0gbm9vcCwgY3NzIH0gPSBjb25maWcgfHwgbnVsbF90cmFuc2l0aW9uO1xuICAgICAgICBpZiAoY3NzKVxuICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCAxLCAwLCBkdXJhdGlvbiwgZGVsYXksIGVhc2luZywgY3NzKTtcbiAgICAgICAgY29uc3Qgc3RhcnRfdGltZSA9IG5vdygpICsgZGVsYXk7XG4gICAgICAgIGNvbnN0IGVuZF90aW1lID0gc3RhcnRfdGltZSArIGR1cmF0aW9uO1xuICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGZhbHNlLCAnc3RhcnQnKSk7XG4gICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBlbmRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBmYWxzZSwgJ2VuZCcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tZ3JvdXAucikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3aWxsIHJlc3VsdCBpbiBgZW5kKClgIGJlaW5nIGNhbGxlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IG5lZWQgdG8gY2xlYW4gdXAgaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChncm91cC5jKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChub3cgPj0gc3RhcnRfdGltZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ID0gZWFzaW5nKChub3cgLSBzdGFydF90aW1lKSAvIGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgdGljaygxIC0gdCwgdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJ1bm5pbmc7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNfZnVuY3Rpb24oY29uZmlnKSkge1xuICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb25maWcgPSBjb25maWcoKTtcbiAgICAgICAgICAgIGdvKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ28oKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW5kKHJlc2V0KSB7XG4gICAgICAgICAgICBpZiAocmVzZXQgJiYgY29uZmlnLnRpY2spIHtcbiAgICAgICAgICAgICAgICBjb25maWcudGljaygxLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChydW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuaW1hdGlvbl9uYW1lKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGVfcnVsZShub2RlLCBhbmltYXRpb25fbmFtZSk7XG4gICAgICAgICAgICAgICAgcnVubmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZV9iaWRpcmVjdGlvbmFsX3RyYW5zaXRpb24obm9kZSwgZm4sIHBhcmFtcywgaW50cm8pIHtcbiAgICBsZXQgY29uZmlnID0gZm4obm9kZSwgcGFyYW1zKTtcbiAgICBsZXQgdCA9IGludHJvID8gMCA6IDE7XG4gICAgbGV0IHJ1bm5pbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IHBlbmRpbmdfcHJvZ3JhbSA9IG51bGw7XG4gICAgbGV0IGFuaW1hdGlvbl9uYW1lID0gbnVsbDtcbiAgICBmdW5jdGlvbiBjbGVhcl9hbmltYXRpb24oKSB7XG4gICAgICAgIGlmIChhbmltYXRpb25fbmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZV9ydWxlKG5vZGUsIGFuaW1hdGlvbl9uYW1lKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5pdChwcm9ncmFtLCBkdXJhdGlvbikge1xuICAgICAgICBjb25zdCBkID0gcHJvZ3JhbS5iIC0gdDtcbiAgICAgICAgZHVyYXRpb24gKj0gTWF0aC5hYnMoZCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhOiB0LFxuICAgICAgICAgICAgYjogcHJvZ3JhbS5iLFxuICAgICAgICAgICAgZCxcbiAgICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgICAgc3RhcnQ6IHByb2dyYW0uc3RhcnQsXG4gICAgICAgICAgICBlbmQ6IHByb2dyYW0uc3RhcnQgKyBkdXJhdGlvbixcbiAgICAgICAgICAgIGdyb3VwOiBwcm9ncmFtLmdyb3VwXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdvKGIpIHtcbiAgICAgICAgY29uc3QgeyBkZWxheSA9IDAsIGR1cmF0aW9uID0gMzAwLCBlYXNpbmcgPSBpZGVudGl0eSwgdGljayA9IG5vb3AsIGNzcyB9ID0gY29uZmlnIHx8IG51bGxfdHJhbnNpdGlvbjtcbiAgICAgICAgY29uc3QgcHJvZ3JhbSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiBub3coKSArIGRlbGF5LFxuICAgICAgICAgICAgYlxuICAgICAgICB9O1xuICAgICAgICBpZiAoIWIpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBwcm9ncmFtLmdyb3VwID0gb3V0cm9zO1xuICAgICAgICAgICAgb3V0cm9zLnIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSkge1xuICAgICAgICAgICAgcGVuZGluZ19wcm9ncmFtID0gcHJvZ3JhbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYW4gaW50cm8sIGFuZCB0aGVyZSdzIGEgZGVsYXksIHdlIG5lZWQgdG8gZG9cbiAgICAgICAgICAgIC8vIGFuIGluaXRpYWwgdGljayBhbmQvb3IgYXBwbHkgQ1NTIGFuaW1hdGlvbiBpbW1lZGlhdGVseVxuICAgICAgICAgICAgaWYgKGNzcykge1xuICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbl9uYW1lID0gY3JlYXRlX3J1bGUobm9kZSwgdCwgYiwgZHVyYXRpb24sIGRlbGF5LCBlYXNpbmcsIGNzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYilcbiAgICAgICAgICAgICAgICB0aWNrKDAsIDEpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gaW5pdChwcm9ncmFtLCBkdXJhdGlvbik7XG4gICAgICAgICAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IGRpc3BhdGNoKG5vZGUsIGIsICdzdGFydCcpKTtcbiAgICAgICAgICAgIGxvb3Aobm93ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ19wcm9ncmFtICYmIG5vdyA+IHBlbmRpbmdfcHJvZ3JhbS5zdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBydW5uaW5nX3Byb2dyYW0gPSBpbml0KHBlbmRpbmdfcHJvZ3JhbSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBwZW5kaW5nX3Byb2dyYW0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkaXNwYXRjaChub2RlLCBydW5uaW5nX3Byb2dyYW0uYiwgJ3N0YXJ0Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uX25hbWUgPSBjcmVhdGVfcnVsZShub2RlLCB0LCBydW5uaW5nX3Byb2dyYW0uYiwgcnVubmluZ19wcm9ncmFtLmR1cmF0aW9uLCAwLCBlYXNpbmcsIGNvbmZpZy5jc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdyA+PSBydW5uaW5nX3Byb2dyYW0uZW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQgPSBydW5uaW5nX3Byb2dyYW0uYiwgMSAtIHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2gobm9kZSwgcnVubmluZ19wcm9ncmFtLmIsICdlbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGVuZGluZ19wcm9ncmFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UncmUgZG9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChydW5uaW5nX3Byb2dyYW0uYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRybyDigJQgd2UgY2FuIHRpZHkgdXAgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJfYW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBvdXRybyDigJQgbmVlZHMgdG8gYmUgY29vcmRpbmF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEtLXJ1bm5pbmdfcHJvZ3JhbS5ncm91cC5yKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2FsbChydW5uaW5nX3Byb2dyYW0uZ3JvdXAuYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChub3cgPj0gcnVubmluZ19wcm9ncmFtLnN0YXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwID0gbm93IC0gcnVubmluZ19wcm9ncmFtLnN0YXJ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdCA9IHJ1bm5pbmdfcHJvZ3JhbS5hICsgcnVubmluZ19wcm9ncmFtLmQgKiBlYXNpbmcocCAvIHJ1bm5pbmdfcHJvZ3JhbS5kdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNrKHQsIDEgLSB0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gISEocnVubmluZ19wcm9ncmFtIHx8IHBlbmRpbmdfcHJvZ3JhbSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBydW4oYikge1xuICAgICAgICAgICAgaWYgKGlzX2Z1bmN0aW9uKGNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICB3YWl0KCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnID0gY29uZmlnKCk7XG4gICAgICAgICAgICAgICAgICAgIGdvKGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ28oYik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVuZCgpIHtcbiAgICAgICAgICAgIGNsZWFyX2FuaW1hdGlvbigpO1xuICAgICAgICAgICAgcnVubmluZ19wcm9ncmFtID0gcGVuZGluZ19wcm9ncmFtID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGhhbmRsZV9wcm9taXNlKHByb21pc2UsIGluZm8pIHtcbiAgICBjb25zdCB0b2tlbiA9IGluZm8udG9rZW4gPSB7fTtcbiAgICBmdW5jdGlvbiB1cGRhdGUodHlwZSwgaW5kZXgsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGluZm8udG9rZW4gIT09IHRva2VuKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbmZvLnJlc29sdmVkID0gdmFsdWU7XG4gICAgICAgIGxldCBjaGlsZF9jdHggPSBpbmZvLmN0eDtcbiAgICAgICAgaWYgKGtleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjaGlsZF9jdHggPSBjaGlsZF9jdHguc2xpY2UoKTtcbiAgICAgICAgICAgIGNoaWxkX2N0eFtrZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmxvY2sgPSB0eXBlICYmIChpbmZvLmN1cnJlbnQgPSB0eXBlKShjaGlsZF9jdHgpO1xuICAgICAgICBsZXQgbmVlZHNfZmx1c2ggPSBmYWxzZTtcbiAgICAgICAgaWYgKGluZm8uYmxvY2spIHtcbiAgICAgICAgICAgIGlmIChpbmZvLmJsb2Nrcykge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzLmZvckVhY2goKGJsb2NrLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSBpbmRleCAmJiBibG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZm8uYmxvY2tzW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tfb3V0cm9zKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZm8uYmxvY2suZCgxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJsb2NrLmMoKTtcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oYmxvY2ssIDEpO1xuICAgICAgICAgICAgYmxvY2subShpbmZvLm1vdW50KCksIGluZm8uYW5jaG9yKTtcbiAgICAgICAgICAgIG5lZWRzX2ZsdXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLmJsb2NrID0gYmxvY2s7XG4gICAgICAgIGlmIChpbmZvLmJsb2NrcylcbiAgICAgICAgICAgIGluZm8uYmxvY2tzW2luZGV4XSA9IGJsb2NrO1xuICAgICAgICBpZiAobmVlZHNfZmx1c2gpIHtcbiAgICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzX3Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudF9jb21wb25lbnQgPSBnZXRfY3VycmVudF9jb21wb25lbnQoKTtcbiAgICAgICAgcHJvbWlzZS50aGVuKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby50aGVuLCAxLCBpbmZvLnZhbHVlLCB2YWx1ZSk7XG4gICAgICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQobnVsbCk7XG4gICAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChjdXJyZW50X2NvbXBvbmVudCk7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5jYXRjaCwgMiwgaW5mby5lcnJvciwgZXJyb3IpO1xuICAgICAgICAgICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KG51bGwpO1xuICAgICAgICAgICAgaWYgKCFpbmZvLmhhc0NhdGNoKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBpZiB3ZSBwcmV2aW91c2x5IGhhZCBhIHRoZW4vY2F0Y2ggYmxvY2ssIGRlc3Ryb3kgaXRcbiAgICAgICAgaWYgKGluZm8uY3VycmVudCAhPT0gaW5mby5wZW5kaW5nKSB7XG4gICAgICAgICAgICB1cGRhdGUoaW5mby5wZW5kaW5nLCAwKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoaW5mby5jdXJyZW50ICE9PSBpbmZvLnRoZW4pIHtcbiAgICAgICAgICAgIHVwZGF0ZShpbmZvLnRoZW4sIDEsIGluZm8udmFsdWUsIHByb21pc2UpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaW5mby5yZXNvbHZlZCA9IHByb21pc2U7XG4gICAgfVxufVxuXG5jb25zdCBnbG9iYWxzID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnXG4gICAgPyB3aW5kb3dcbiAgICA6IHR5cGVvZiBnbG9iYWxUaGlzICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICA/IGdsb2JhbFRoaXNcbiAgICAgICAgOiBnbG9iYWwpO1xuXG5mdW5jdGlvbiBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICBibG9jay5kKDEpO1xuICAgIGxvb2t1cC5kZWxldGUoYmxvY2sua2V5KTtcbn1cbmZ1bmN0aW9uIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApIHtcbiAgICB0cmFuc2l0aW9uX291dChibG9jaywgMSwgMSwgKCkgPT4ge1xuICAgICAgICBsb29rdXAuZGVsZXRlKGJsb2NrLmtleSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2soYmxvY2ssIGxvb2t1cCkge1xuICAgIGJsb2NrLmYoKTtcbiAgICBkZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gZml4X2FuZF9vdXRyb19hbmRfZGVzdHJveV9ibG9jayhibG9jaywgbG9va3VwKSB7XG4gICAgYmxvY2suZigpO1xuICAgIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrKGJsb2NrLCBsb29rdXApO1xufVxuZnVuY3Rpb24gdXBkYXRlX2tleWVkX2VhY2gob2xkX2Jsb2NrcywgZGlydHksIGdldF9rZXksIGR5bmFtaWMsIGN0eCwgbGlzdCwgbG9va3VwLCBub2RlLCBkZXN0cm95LCBjcmVhdGVfZWFjaF9ibG9jaywgbmV4dCwgZ2V0X2NvbnRleHQpIHtcbiAgICBsZXQgbyA9IG9sZF9ibG9ja3MubGVuZ3RoO1xuICAgIGxldCBuID0gbGlzdC5sZW5ndGg7XG4gICAgbGV0IGkgPSBvO1xuICAgIGNvbnN0IG9sZF9pbmRleGVzID0ge307XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgb2xkX2luZGV4ZXNbb2xkX2Jsb2Nrc1tpXS5rZXldID0gaTtcbiAgICBjb25zdCBuZXdfYmxvY2tzID0gW107XG4gICAgY29uc3QgbmV3X2xvb2t1cCA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBkZWx0YXMgPSBuZXcgTWFwKCk7XG4gICAgaSA9IG47XG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgICBjb25zdCBjaGlsZF9jdHggPSBnZXRfY29udGV4dChjdHgsIGxpc3QsIGkpO1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGNoaWxkX2N0eCk7XG4gICAgICAgIGxldCBibG9jayA9IGxvb2t1cC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKCFibG9jaykge1xuICAgICAgICAgICAgYmxvY2sgPSBjcmVhdGVfZWFjaF9ibG9jayhrZXksIGNoaWxkX2N0eCk7XG4gICAgICAgICAgICBibG9jay5jKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZHluYW1pYykge1xuICAgICAgICAgICAgYmxvY2sucChjaGlsZF9jdHgsIGRpcnR5KTtcbiAgICAgICAgfVxuICAgICAgICBuZXdfbG9va3VwLnNldChrZXksIG5ld19ibG9ja3NbaV0gPSBibG9jayk7XG4gICAgICAgIGlmIChrZXkgaW4gb2xkX2luZGV4ZXMpXG4gICAgICAgICAgICBkZWx0YXMuc2V0KGtleSwgTWF0aC5hYnMoaSAtIG9sZF9pbmRleGVzW2tleV0pKTtcbiAgICB9XG4gICAgY29uc3Qgd2lsbF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IGRpZF9tb3ZlID0gbmV3IFNldCgpO1xuICAgIGZ1bmN0aW9uIGluc2VydChibG9jaykge1xuICAgICAgICB0cmFuc2l0aW9uX2luKGJsb2NrLCAxKTtcbiAgICAgICAgYmxvY2subShub2RlLCBuZXh0KTtcbiAgICAgICAgbG9va3VwLnNldChibG9jay5rZXksIGJsb2NrKTtcbiAgICAgICAgbmV4dCA9IGJsb2NrLmZpcnN0O1xuICAgICAgICBuLS07XG4gICAgfVxuICAgIHdoaWxlIChvICYmIG4pIHtcbiAgICAgICAgY29uc3QgbmV3X2Jsb2NrID0gbmV3X2Jsb2Nrc1tuIC0gMV07XG4gICAgICAgIGNvbnN0IG9sZF9ibG9jayA9IG9sZF9ibG9ja3NbbyAtIDFdO1xuICAgICAgICBjb25zdCBuZXdfa2V5ID0gbmV3X2Jsb2NrLmtleTtcbiAgICAgICAgY29uc3Qgb2xkX2tleSA9IG9sZF9ibG9jay5rZXk7XG4gICAgICAgIGlmIChuZXdfYmxvY2sgPT09IG9sZF9ibG9jaykge1xuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgbmV4dCA9IG5ld19ibG9jay5maXJzdDtcbiAgICAgICAgICAgIG8tLTtcbiAgICAgICAgICAgIG4tLTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghbmV3X2xvb2t1cC5oYXMob2xkX2tleSkpIHtcbiAgICAgICAgICAgIC8vIHJlbW92ZSBvbGQgYmxvY2tcbiAgICAgICAgICAgIGRlc3Ryb3kob2xkX2Jsb2NrLCBsb29rdXApO1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFsb29rdXAuaGFzKG5ld19rZXkpIHx8IHdpbGxfbW92ZS5oYXMobmV3X2tleSkpIHtcbiAgICAgICAgICAgIGluc2VydChuZXdfYmxvY2spO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRpZF9tb3ZlLmhhcyhvbGRfa2V5KSkge1xuICAgICAgICAgICAgby0tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlbHRhcy5nZXQobmV3X2tleSkgPiBkZWx0YXMuZ2V0KG9sZF9rZXkpKSB7XG4gICAgICAgICAgICBkaWRfbW92ZS5hZGQobmV3X2tleSk7XG4gICAgICAgICAgICBpbnNlcnQobmV3X2Jsb2NrKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdpbGxfbW92ZS5hZGQob2xkX2tleSk7XG4gICAgICAgICAgICBvLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKG8tLSkge1xuICAgICAgICBjb25zdCBvbGRfYmxvY2sgPSBvbGRfYmxvY2tzW29dO1xuICAgICAgICBpZiAoIW5ld19sb29rdXAuaGFzKG9sZF9ibG9jay5rZXkpKVxuICAgICAgICAgICAgZGVzdHJveShvbGRfYmxvY2ssIGxvb2t1cCk7XG4gICAgfVxuICAgIHdoaWxlIChuKVxuICAgICAgICBpbnNlcnQobmV3X2Jsb2Nrc1tuIC0gMV0pO1xuICAgIHJldHVybiBuZXdfYmxvY2tzO1xufVxuZnVuY3Rpb24gdmFsaWRhdGVfZWFjaF9rZXlzKGN0eCwgbGlzdCwgZ2V0X2NvbnRleHQsIGdldF9rZXkpIHtcbiAgICBjb25zdCBrZXlzID0gbmV3IFNldCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBrZXkgPSBnZXRfa2V5KGdldF9jb250ZXh0KGN0eCwgbGlzdCwgaSkpO1xuICAgICAgICBpZiAoa2V5cy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaGF2ZSBkdXBsaWNhdGUga2V5cyBpbiBhIGtleWVkIGVhY2gnKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlzLmFkZChrZXkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0X3NwcmVhZF91cGRhdGUobGV2ZWxzLCB1cGRhdGVzKSB7XG4gICAgY29uc3QgdXBkYXRlID0ge307XG4gICAgY29uc3QgdG9fbnVsbF9vdXQgPSB7fTtcbiAgICBjb25zdCBhY2NvdW50ZWRfZm9yID0geyAkJHNjb3BlOiAxIH07XG4gICAgbGV0IGkgPSBsZXZlbHMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgY29uc3QgbyA9IGxldmVsc1tpXTtcbiAgICAgICAgY29uc3QgbiA9IHVwZGF0ZXNbaV07XG4gICAgICAgIGlmIChuKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIG4pKVxuICAgICAgICAgICAgICAgICAgICB0b19udWxsX291dFtrZXldID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIG4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFjY291bnRlZF9mb3Jba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVba2V5XSA9IG5ba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgYWNjb3VudGVkX2ZvcltrZXldID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXZlbHNbaV0gPSBuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gbykge1xuICAgICAgICAgICAgICAgIGFjY291bnRlZF9mb3Jba2V5XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gdG9fbnVsbF9vdXQpIHtcbiAgICAgICAgaWYgKCEoa2V5IGluIHVwZGF0ZSkpXG4gICAgICAgICAgICB1cGRhdGVba2V5XSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHVwZGF0ZTtcbn1cbmZ1bmN0aW9uIGdldF9zcHJlYWRfb2JqZWN0KHNwcmVhZF9wcm9wcykge1xuICAgIHJldHVybiB0eXBlb2Ygc3ByZWFkX3Byb3BzID09PSAnb2JqZWN0JyAmJiBzcHJlYWRfcHJvcHMgIT09IG51bGwgPyBzcHJlYWRfcHJvcHMgOiB7fTtcbn1cblxuLy8gc291cmNlOiBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmRpY2VzLmh0bWxcbmNvbnN0IGJvb2xlYW5fYXR0cmlidXRlcyA9IG5ldyBTZXQoW1xuICAgICdhbGxvd2Z1bGxzY3JlZW4nLFxuICAgICdhbGxvd3BheW1lbnRyZXF1ZXN0JyxcbiAgICAnYXN5bmMnLFxuICAgICdhdXRvZm9jdXMnLFxuICAgICdhdXRvcGxheScsXG4gICAgJ2NoZWNrZWQnLFxuICAgICdjb250cm9scycsXG4gICAgJ2RlZmF1bHQnLFxuICAgICdkZWZlcicsXG4gICAgJ2Rpc2FibGVkJyxcbiAgICAnZm9ybW5vdmFsaWRhdGUnLFxuICAgICdoaWRkZW4nLFxuICAgICdpc21hcCcsXG4gICAgJ2xvb3AnLFxuICAgICdtdWx0aXBsZScsXG4gICAgJ211dGVkJyxcbiAgICAnbm9tb2R1bGUnLFxuICAgICdub3ZhbGlkYXRlJyxcbiAgICAnb3BlbicsXG4gICAgJ3BsYXlzaW5saW5lJyxcbiAgICAncmVhZG9ubHknLFxuICAgICdyZXF1aXJlZCcsXG4gICAgJ3JldmVyc2VkJyxcbiAgICAnc2VsZWN0ZWQnXG5dKTtcblxuY29uc3QgaW52YWxpZF9hdHRyaWJ1dGVfbmFtZV9jaGFyYWN0ZXIgPSAvW1xccydcIj4vPVxcdXtGREQwfS1cXHV7RkRFRn1cXHV7RkZGRX1cXHV7RkZGRn1cXHV7MUZGRkV9XFx1ezFGRkZGfVxcdXsyRkZGRX1cXHV7MkZGRkZ9XFx1ezNGRkZFfVxcdXszRkZGRn1cXHV7NEZGRkV9XFx1ezRGRkZGfVxcdXs1RkZGRX1cXHV7NUZGRkZ9XFx1ezZGRkZFfVxcdXs2RkZGRn1cXHV7N0ZGRkV9XFx1ezdGRkZGfVxcdXs4RkZGRX1cXHV7OEZGRkZ9XFx1ezlGRkZFfVxcdXs5RkZGRn1cXHV7QUZGRkV9XFx1e0FGRkZGfVxcdXtCRkZGRX1cXHV7QkZGRkZ9XFx1e0NGRkZFfVxcdXtDRkZGRn1cXHV7REZGRkV9XFx1e0RGRkZGfVxcdXtFRkZGRX1cXHV7RUZGRkZ9XFx1e0ZGRkZFfVxcdXtGRkZGRn1cXHV7MTBGRkZFfVxcdXsxMEZGRkZ9XS91O1xuLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjYXR0cmlidXRlcy0yXG4vLyBodHRwczovL2luZnJhLnNwZWMud2hhdHdnLm9yZy8jbm9uY2hhcmFjdGVyXG5mdW5jdGlvbiBzcHJlYWQoYXJncywgY2xhc3Nlc190b19hZGQpIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gT2JqZWN0LmFzc2lnbih7fSwgLi4uYXJncyk7XG4gICAgaWYgKGNsYXNzZXNfdG9fYWRkKSB7XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzLmNsYXNzID09IG51bGwpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgPSBjbGFzc2VzX3RvX2FkZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuY2xhc3MgKz0gJyAnICsgY2xhc3Nlc190b19hZGQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGlmIChpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3Rlci50ZXN0KG5hbWUpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXNbbmFtZV07XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHN0ciArPSAnICcgKyBuYW1lO1xuICAgICAgICBlbHNlIGlmIChib29sZWFuX2F0dHJpYnV0ZXMuaGFzKG5hbWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyAnICsgbmFtZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzdHIgKz0gYCAke25hbWV9PVwiJHtTdHJpbmcodmFsdWUpLnJlcGxhY2UoL1wiL2csICcmIzM0OycpLnJlcGxhY2UoLycvZywgJyYjMzk7Jyl9XCJgO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IGVzY2FwZWQgPSB7XG4gICAgJ1wiJzogJyZxdW90OycsXG4gICAgXCInXCI6ICcmIzM5OycsXG4gICAgJyYnOiAnJmFtcDsnLFxuICAgICc8JzogJyZsdDsnLFxuICAgICc+JzogJyZndDsnXG59O1xuZnVuY3Rpb24gZXNjYXBlKGh0bWwpIHtcbiAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoL1tcIicmPD5dL2csIG1hdGNoID0+IGVzY2FwZWRbbWF0Y2hdKTtcbn1cbmZ1bmN0aW9uIGVhY2goaXRlbXMsIGZuKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc3RyICs9IGZuKGl0ZW1zW2ldLCBpKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbmNvbnN0IG1pc3NpbmdfY29tcG9uZW50ID0ge1xuICAgICQkcmVuZGVyOiAoKSA9PiAnJ1xufTtcbmZ1bmN0aW9uIHZhbGlkYXRlX2NvbXBvbmVudChjb21wb25lbnQsIG5hbWUpIHtcbiAgICBpZiAoIWNvbXBvbmVudCB8fCAhY29tcG9uZW50LiQkcmVuZGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAnc3ZlbHRlOmNvbXBvbmVudCcpXG4gICAgICAgICAgICBuYW1lICs9ICcgdGhpcz17Li4ufSc7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgPCR7bmFtZX0+IGlzIG5vdCBhIHZhbGlkIFNTUiBjb21wb25lbnQuIFlvdSBtYXkgbmVlZCB0byByZXZpZXcgeW91ciBidWlsZCBjb25maWcgdG8gZW5zdXJlIHRoYXQgZGVwZW5kZW5jaWVzIGFyZSBjb21waWxlZCwgcmF0aGVyIHRoYW4gaW1wb3J0ZWQgYXMgcHJlLWNvbXBpbGVkIG1vZHVsZXNgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvbmVudDtcbn1cbmZ1bmN0aW9uIGRlYnVnKGZpbGUsIGxpbmUsIGNvbHVtbiwgdmFsdWVzKSB7XG4gICAgY29uc29sZS5sb2coYHtAZGVidWd9ICR7ZmlsZSA/IGZpbGUgKyAnICcgOiAnJ30oJHtsaW5lfToke2NvbHVtbn0pYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUubG9nKHZhbHVlcyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIHJldHVybiAnJztcbn1cbmxldCBvbl9kZXN0cm95O1xuZnVuY3Rpb24gY3JlYXRlX3Nzcl9jb21wb25lbnQoZm4pIHtcbiAgICBmdW5jdGlvbiAkJHJlbmRlcihyZXN1bHQsIHByb3BzLCBiaW5kaW5ncywgc2xvdHMpIHtcbiAgICAgICAgY29uc3QgcGFyZW50X2NvbXBvbmVudCA9IGN1cnJlbnRfY29tcG9uZW50O1xuICAgICAgICBjb25zdCAkJCA9IHtcbiAgICAgICAgICAgIG9uX2Rlc3Ryb3ksXG4gICAgICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgICAgICAvLyB0aGVzZSB3aWxsIGJlIGltbWVkaWF0ZWx5IGRpc2NhcmRlZFxuICAgICAgICAgICAgb25fbW91bnQ6IFtdLFxuICAgICAgICAgICAgYmVmb3JlX3VwZGF0ZTogW10sXG4gICAgICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICAgICAgY2FsbGJhY2tzOiBibGFua19vYmplY3QoKVxuICAgICAgICB9O1xuICAgICAgICBzZXRfY3VycmVudF9jb21wb25lbnQoeyAkJCB9KTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGZuKHJlc3VsdCwgcHJvcHMsIGJpbmRpbmdzLCBzbG90cyk7XG4gICAgICAgIHNldF9jdXJyZW50X2NvbXBvbmVudChwYXJlbnRfY29tcG9uZW50KTtcbiAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbmRlcjogKHByb3BzID0ge30sIG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgICAgICAgICAgb25fZGVzdHJveSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geyB0aXRsZTogJycsIGhlYWQ6ICcnLCBjc3M6IG5ldyBTZXQoKSB9O1xuICAgICAgICAgICAgY29uc3QgaHRtbCA9ICQkcmVuZGVyKHJlc3VsdCwgcHJvcHMsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHJ1bl9hbGwob25fZGVzdHJveSk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGh0bWwsXG4gICAgICAgICAgICAgICAgY3NzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGU6IEFycmF5LmZyb20ocmVzdWx0LmNzcykubWFwKGNzcyA9PiBjc3MuY29kZSkuam9pbignXFxuJyksXG4gICAgICAgICAgICAgICAgICAgIG1hcDogbnVsbCAvLyBUT0RPXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBoZWFkOiByZXN1bHQudGl0bGUgKyByZXN1bHQuaGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgJCRyZW5kZXJcbiAgICB9O1xufVxuZnVuY3Rpb24gYWRkX2F0dHJpYnV0ZShuYW1lLCB2YWx1ZSwgYm9vbGVhbikge1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IChib29sZWFuICYmICF2YWx1ZSkpXG4gICAgICAgIHJldHVybiAnJztcbiAgICByZXR1cm4gYCAke25hbWV9JHt2YWx1ZSA9PT0gdHJ1ZSA/ICcnIDogYD0ke3R5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyBKU09OLnN0cmluZ2lmeShlc2NhcGUodmFsdWUpKSA6IGBcIiR7dmFsdWV9XCJgfWB9YDtcbn1cbmZ1bmN0aW9uIGFkZF9jbGFzc2VzKGNsYXNzZXMpIHtcbiAgICByZXR1cm4gY2xhc3NlcyA/IGAgY2xhc3M9XCIke2NsYXNzZXN9XCJgIDogJyc7XG59XG5cbmZ1bmN0aW9uIGJpbmQoY29tcG9uZW50LCBuYW1lLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGluZGV4ID0gY29tcG9uZW50LiQkLnByb3BzW25hbWVdO1xuICAgIGlmIChpbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbXBvbmVudC4kJC5ib3VuZFtpbmRleF0gPSBjYWxsYmFjaztcbiAgICAgICAgY2FsbGJhY2soY29tcG9uZW50LiQkLmN0eFtpbmRleF0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZV9jb21wb25lbnQoYmxvY2spIHtcbiAgICBibG9jayAmJiBibG9jay5jKCk7XG59XG5mdW5jdGlvbiBjbGFpbV9jb21wb25lbnQoYmxvY2ssIHBhcmVudF9ub2Rlcykge1xuICAgIGJsb2NrICYmIGJsb2NrLmwocGFyZW50X25vZGVzKTtcbn1cbmZ1bmN0aW9uIG1vdW50X2NvbXBvbmVudChjb21wb25lbnQsIHRhcmdldCwgYW5jaG9yKSB7XG4gICAgY29uc3QgeyBmcmFnbWVudCwgb25fbW91bnQsIG9uX2Rlc3Ryb3ksIGFmdGVyX3VwZGF0ZSB9ID0gY29tcG9uZW50LiQkO1xuICAgIGZyYWdtZW50ICYmIGZyYWdtZW50Lm0odGFyZ2V0LCBhbmNob3IpO1xuICAgIC8vIG9uTW91bnQgaGFwcGVucyBiZWZvcmUgdGhlIGluaXRpYWwgYWZ0ZXJVcGRhdGVcbiAgICBhZGRfcmVuZGVyX2NhbGxiYWNrKCgpID0+IHtcbiAgICAgICAgY29uc3QgbmV3X29uX2Rlc3Ryb3kgPSBvbl9tb3VudC5tYXAocnVuKS5maWx0ZXIoaXNfZnVuY3Rpb24pO1xuICAgICAgICBpZiAob25fZGVzdHJveSkge1xuICAgICAgICAgICAgb25fZGVzdHJveS5wdXNoKC4uLm5ld19vbl9kZXN0cm95KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEVkZ2UgY2FzZSAtIGNvbXBvbmVudCB3YXMgZGVzdHJveWVkIGltbWVkaWF0ZWx5LFxuICAgICAgICAgICAgLy8gbW9zdCBsaWtlbHkgYXMgYSByZXN1bHQgb2YgYSBiaW5kaW5nIGluaXRpYWxpc2luZ1xuICAgICAgICAgICAgcnVuX2FsbChuZXdfb25fZGVzdHJveSk7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50LiQkLm9uX21vdW50ID0gW107XG4gICAgfSk7XG4gICAgYWZ0ZXJfdXBkYXRlLmZvckVhY2goYWRkX3JlbmRlcl9jYWxsYmFjayk7XG59XG5mdW5jdGlvbiBkZXN0cm95X2NvbXBvbmVudChjb21wb25lbnQsIGRldGFjaGluZykge1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkO1xuICAgIGlmICgkJC5mcmFnbWVudCAhPT0gbnVsbCkge1xuICAgICAgICBydW5fYWxsKCQkLm9uX2Rlc3Ryb3kpO1xuICAgICAgICAkJC5mcmFnbWVudCAmJiAkJC5mcmFnbWVudC5kKGRldGFjaGluZyk7XG4gICAgICAgIC8vIFRPRE8gbnVsbCBvdXQgb3RoZXIgcmVmcywgaW5jbHVkaW5nIGNvbXBvbmVudC4kJCAoYnV0IG5lZWQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgZmluYWwgc3RhdGU/KVxuICAgICAgICAkJC5vbl9kZXN0cm95ID0gJCQuZnJhZ21lbnQgPSBudWxsO1xuICAgICAgICAkJC5jdHggPSBbXTtcbiAgICB9XG59XG5mdW5jdGlvbiBtYWtlX2RpcnR5KGNvbXBvbmVudCwgaSkge1xuICAgIGlmIChjb21wb25lbnQuJCQuZGlydHlbMF0gPT09IC0xKSB7XG4gICAgICAgIGRpcnR5X2NvbXBvbmVudHMucHVzaChjb21wb25lbnQpO1xuICAgICAgICBzY2hlZHVsZV91cGRhdGUoKTtcbiAgICAgICAgY29tcG9uZW50LiQkLmRpcnR5LmZpbGwoMCk7XG4gICAgfVxuICAgIGNvbXBvbmVudC4kJC5kaXJ0eVsoaSAvIDMxKSB8IDBdIHw9ICgxIDw8IChpICUgMzEpKTtcbn1cbmZ1bmN0aW9uIGluaXQoY29tcG9uZW50LCBvcHRpb25zLCBpbnN0YW5jZSwgY3JlYXRlX2ZyYWdtZW50LCBub3RfZXF1YWwsIHByb3BzLCBkaXJ0eSA9IFstMV0pIHtcbiAgICBjb25zdCBwYXJlbnRfY29tcG9uZW50ID0gY3VycmVudF9jb21wb25lbnQ7XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgY29uc3QgcHJvcF92YWx1ZXMgPSBvcHRpb25zLnByb3BzIHx8IHt9O1xuICAgIGNvbnN0ICQkID0gY29tcG9uZW50LiQkID0ge1xuICAgICAgICBmcmFnbWVudDogbnVsbCxcbiAgICAgICAgY3R4OiBudWxsLFxuICAgICAgICAvLyBzdGF0ZVxuICAgICAgICBwcm9wcyxcbiAgICAgICAgdXBkYXRlOiBub29wLFxuICAgICAgICBub3RfZXF1YWwsXG4gICAgICAgIGJvdW5kOiBibGFua19vYmplY3QoKSxcbiAgICAgICAgLy8gbGlmZWN5Y2xlXG4gICAgICAgIG9uX21vdW50OiBbXSxcbiAgICAgICAgb25fZGVzdHJveTogW10sXG4gICAgICAgIGJlZm9yZV91cGRhdGU6IFtdLFxuICAgICAgICBhZnRlcl91cGRhdGU6IFtdLFxuICAgICAgICBjb250ZXh0OiBuZXcgTWFwKHBhcmVudF9jb21wb25lbnQgPyBwYXJlbnRfY29tcG9uZW50LiQkLmNvbnRleHQgOiBbXSksXG4gICAgICAgIC8vIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICBjYWxsYmFja3M6IGJsYW5rX29iamVjdCgpLFxuICAgICAgICBkaXJ0eSxcbiAgICAgICAgc2tpcF9ib3VuZDogZmFsc2VcbiAgICB9O1xuICAgIGxldCByZWFkeSA9IGZhbHNlO1xuICAgICQkLmN0eCA9IGluc3RhbmNlXG4gICAgICAgID8gaW5zdGFuY2UoY29tcG9uZW50LCBwcm9wX3ZhbHVlcywgKGksIHJldCwgLi4ucmVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSByZXN0Lmxlbmd0aCA/IHJlc3RbMF0gOiByZXQ7XG4gICAgICAgICAgICBpZiAoJCQuY3R4ICYmIG5vdF9lcXVhbCgkJC5jdHhbaV0sICQkLmN0eFtpXSA9IHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghJCQuc2tpcF9ib3VuZCAmJiAkJC5ib3VuZFtpXSlcbiAgICAgICAgICAgICAgICAgICAgJCQuYm91bmRbaV0odmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChyZWFkeSlcbiAgICAgICAgICAgICAgICAgICAgbWFrZV9kaXJ0eShjb21wb25lbnQsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSlcbiAgICAgICAgOiBbXTtcbiAgICAkJC51cGRhdGUoKTtcbiAgICByZWFkeSA9IHRydWU7XG4gICAgcnVuX2FsbCgkJC5iZWZvcmVfdXBkYXRlKTtcbiAgICAvLyBgZmFsc2VgIGFzIGEgc3BlY2lhbCBjYXNlIG9mIG5vIERPTSBjb21wb25lbnRcbiAgICAkJC5mcmFnbWVudCA9IGNyZWF0ZV9mcmFnbWVudCA/IGNyZWF0ZV9mcmFnbWVudCgkJC5jdHgpIDogZmFsc2U7XG4gICAgaWYgKG9wdGlvbnMudGFyZ2V0KSB7XG4gICAgICAgIGlmIChvcHRpb25zLmh5ZHJhdGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gY2hpbGRyZW4ob3B0aW9ucy50YXJnZXQpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50Lmwobm9kZXMpO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChkZXRhY2gpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgICAgICQkLmZyYWdtZW50ICYmICQkLmZyYWdtZW50LmMoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5pbnRybylcbiAgICAgICAgICAgIHRyYW5zaXRpb25faW4oY29tcG9uZW50LiQkLmZyYWdtZW50KTtcbiAgICAgICAgbW91bnRfY29tcG9uZW50KGNvbXBvbmVudCwgb3B0aW9ucy50YXJnZXQsIG9wdGlvbnMuYW5jaG9yKTtcbiAgICAgICAgZmx1c2goKTtcbiAgICB9XG4gICAgc2V0X2N1cnJlbnRfY29tcG9uZW50KHBhcmVudF9jb21wb25lbnQpO1xufVxubGV0IFN2ZWx0ZUVsZW1lbnQ7XG5pZiAodHlwZW9mIEhUTUxFbGVtZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgU3ZlbHRlRWxlbWVudCA9IGNsYXNzIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaFNoYWRvdyh7IG1vZGU6ICdvcGVuJyB9KTtcbiAgICAgICAgfVxuICAgICAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgdG9kbzogaW1wcm92ZSB0eXBpbmdzXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLiQkLnNsb3R0ZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlIHRvZG86IGltcHJvdmUgdHlwaW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy4kJC5zbG90dGVkW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyLCBfb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzW2F0dHJdID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgJGRlc3Ryb3koKSB7XG4gICAgICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgICAgIHRoaXMuJGRlc3Ryb3kgPSBub29wO1xuICAgICAgICB9XG4gICAgICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gVE9ETyBzaG91bGQgdGhpcyBkZWxlZ2F0ZSB0byBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tzID0gKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdIHx8ICh0aGlzLiQkLmNhbGxiYWNrc1t0eXBlXSA9IFtdKSk7XG4gICAgICAgICAgICBjYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLiQkc2V0ICYmICFpc19lbXB0eSgkJHByb3BzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnQge1xuICAgICRkZXN0cm95KCkge1xuICAgICAgICBkZXN0cm95X2NvbXBvbmVudCh0aGlzLCAxKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9IG5vb3A7XG4gICAgfVxuICAgICRvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICBjb25zdCBjYWxsYmFja3MgPSAodGhpcy4kJC5jYWxsYmFja3NbdHlwZV0gfHwgKHRoaXMuJCQuY2FsbGJhY2tzW3R5cGVdID0gW10pKTtcbiAgICAgICAgY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBjYWxsYmFja3MuaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAkc2V0KCQkcHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuJCRzZXQgJiYgIWlzX2VtcHR5KCQkcHJvcHMpKSB7XG4gICAgICAgICAgICB0aGlzLiQkLnNraXBfYm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy4kJHNldCgkJHByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuJCQuc2tpcF9ib3VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkaXNwYXRjaF9kZXYodHlwZSwgZGV0YWlsKSB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjdXN0b21fZXZlbnQodHlwZSwgT2JqZWN0LmFzc2lnbih7IHZlcnNpb246ICczLjMwLjEnIH0sIGRldGFpbCkpKTtcbn1cbmZ1bmN0aW9uIGFwcGVuZF9kZXYodGFyZ2V0LCBub2RlKSB7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01JbnNlcnQnLCB7IHRhcmdldCwgbm9kZSB9KTtcbiAgICBhcHBlbmQodGFyZ2V0LCBub2RlKTtcbn1cbmZ1bmN0aW9uIGluc2VydF9kZXYodGFyZ2V0LCBub2RlLCBhbmNob3IpIHtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTUluc2VydCcsIHsgdGFyZ2V0LCBub2RlLCBhbmNob3IgfSk7XG4gICAgaW5zZXJ0KHRhcmdldCwgbm9kZSwgYW5jaG9yKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9kZXYobm9kZSkge1xuICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlJywgeyBub2RlIH0pO1xuICAgIGRldGFjaChub2RlKTtcbn1cbmZ1bmN0aW9uIGRldGFjaF9iZXR3ZWVuX2RldihiZWZvcmUsIGFmdGVyKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZyAmJiBiZWZvcmUubmV4dFNpYmxpbmcgIT09IGFmdGVyKSB7XG4gICAgICAgIGRldGFjaF9kZXYoYmVmb3JlLm5leHRTaWJsaW5nKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZXRhY2hfYmVmb3JlX2RldihhZnRlcikge1xuICAgIHdoaWxlIChhZnRlci5wcmV2aW91c1NpYmxpbmcpIHtcbiAgICAgICAgZGV0YWNoX2RldihhZnRlci5wcmV2aW91c1NpYmxpbmcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRldGFjaF9hZnRlcl9kZXYoYmVmb3JlKSB7XG4gICAgd2hpbGUgKGJlZm9yZS5uZXh0U2libGluZykge1xuICAgICAgICBkZXRhY2hfZGV2KGJlZm9yZS5uZXh0U2libGluZyk7XG4gICAgfVxufVxuZnVuY3Rpb24gbGlzdGVuX2Rldihub2RlLCBldmVudCwgaGFuZGxlciwgb3B0aW9ucywgaGFzX3ByZXZlbnRfZGVmYXVsdCwgaGFzX3N0b3BfcHJvcGFnYXRpb24pIHtcbiAgICBjb25zdCBtb2RpZmllcnMgPSBvcHRpb25zID09PSB0cnVlID8gWydjYXB0dXJlJ10gOiBvcHRpb25zID8gQXJyYXkuZnJvbShPYmplY3Qua2V5cyhvcHRpb25zKSkgOiBbXTtcbiAgICBpZiAoaGFzX3ByZXZlbnRfZGVmYXVsdClcbiAgICAgICAgbW9kaWZpZXJzLnB1c2goJ3ByZXZlbnREZWZhdWx0Jyk7XG4gICAgaWYgKGhhc19zdG9wX3Byb3BhZ2F0aW9uKVxuICAgICAgICBtb2RpZmllcnMucHVzaCgnc3RvcFByb3BhZ2F0aW9uJyk7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01BZGRFdmVudExpc3RlbmVyJywgeyBub2RlLCBldmVudCwgaGFuZGxlciwgbW9kaWZpZXJzIH0pO1xuICAgIGNvbnN0IGRpc3Bvc2UgPSBsaXN0ZW4obm9kZSwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NUmVtb3ZlRXZlbnRMaXN0ZW5lcicsIHsgbm9kZSwgZXZlbnQsIGhhbmRsZXIsIG1vZGlmaWVycyB9KTtcbiAgICAgICAgZGlzcG9zZSgpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhdHRyX2Rldihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKSB7XG4gICAgYXR0cihub2RlLCBhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICBpZiAodmFsdWUgPT0gbnVsbClcbiAgICAgICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01SZW1vdmVBdHRyaWJ1dGUnLCB7IG5vZGUsIGF0dHJpYnV0ZSB9KTtcbiAgICBlbHNlXG4gICAgICAgIGRpc3BhdGNoX2RldignU3ZlbHRlRE9NU2V0QXR0cmlidXRlJywgeyBub2RlLCBhdHRyaWJ1dGUsIHZhbHVlIH0pO1xufVxuZnVuY3Rpb24gcHJvcF9kZXYobm9kZSwgcHJvcGVydHksIHZhbHVlKSB7XG4gICAgbm9kZVtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgICBkaXNwYXRjaF9kZXYoJ1N2ZWx0ZURPTVNldFByb3BlcnR5JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBkYXRhc2V0X2Rldihub2RlLCBwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgICBub2RlLmRhdGFzZXRbcHJvcGVydHldID0gdmFsdWU7XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhc2V0JywgeyBub2RlLCBwcm9wZXJ0eSwgdmFsdWUgfSk7XG59XG5mdW5jdGlvbiBzZXRfZGF0YV9kZXYodGV4dCwgZGF0YSkge1xuICAgIGRhdGEgPSAnJyArIGRhdGE7XG4gICAgaWYgKHRleHQud2hvbGVUZXh0ID09PSBkYXRhKVxuICAgICAgICByZXR1cm47XG4gICAgZGlzcGF0Y2hfZGV2KCdTdmVsdGVET01TZXREYXRhJywgeyBub2RlOiB0ZXh0LCBkYXRhIH0pO1xuICAgIHRleHQuZGF0YSA9IGRhdGE7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50KGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnc3RyaW5nJyAmJiAhKGFyZyAmJiB0eXBlb2YgYXJnID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBhcmcpKSB7XG4gICAgICAgIGxldCBtc2cgPSAneyNlYWNofSBvbmx5IGl0ZXJhdGVzIG92ZXIgYXJyYXktbGlrZSBvYmplY3RzLic7XG4gICAgICAgIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIGFyZyAmJiBTeW1ib2wuaXRlcmF0b3IgaW4gYXJnKSB7XG4gICAgICAgICAgICBtc2cgKz0gJyBZb3UgY2FuIHVzZSBhIHNwcmVhZCB0byBjb252ZXJ0IHRoaXMgaXRlcmFibGUgaW50byBhbiBhcnJheS4nO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHZhbGlkYXRlX3Nsb3RzKG5hbWUsIHNsb3QsIGtleXMpIHtcbiAgICBmb3IgKGNvbnN0IHNsb3Rfa2V5IG9mIE9iamVjdC5rZXlzKHNsb3QpKSB7XG4gICAgICAgIGlmICghfmtleXMuaW5kZXhPZihzbG90X2tleSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgPCR7bmFtZX0+IHJlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgc2xvdCBcIiR7c2xvdF9rZXl9XCIuYCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBTdmVsdGVDb21wb25lbnREZXYgZXh0ZW5kcyBTdmVsdGVDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zIHx8ICghb3B0aW9ucy50YXJnZXQgJiYgIW9wdGlvbnMuJCRpbmxpbmUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCIndGFyZ2V0JyBpcyBhIHJlcXVpcmVkIG9wdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcigpO1xuICAgIH1cbiAgICAkZGVzdHJveSgpIHtcbiAgICAgICAgc3VwZXIuJGRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy4kZGVzdHJveSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignQ29tcG9uZW50IHdhcyBhbHJlYWR5IGRlc3Ryb3llZCcpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgJGNhcHR1cmVfc3RhdGUoKSB7IH1cbiAgICAkaW5qZWN0X3N0YXRlKCkgeyB9XG59XG5mdW5jdGlvbiBsb29wX2d1YXJkKHRpbWVvdXQpIHtcbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgaWYgKERhdGUubm93KCkgLSBzdGFydCA+IHRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW5maW5pdGUgbG9vcCBkZXRlY3RlZCcpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZXhwb3J0IHsgSHRtbFRhZywgU3ZlbHRlQ29tcG9uZW50LCBTdmVsdGVDb21wb25lbnREZXYsIFN2ZWx0ZUVsZW1lbnQsIGFjdGlvbl9kZXN0cm95ZXIsIGFkZF9hdHRyaWJ1dGUsIGFkZF9jbGFzc2VzLCBhZGRfZmx1c2hfY2FsbGJhY2ssIGFkZF9sb2NhdGlvbiwgYWRkX3JlbmRlcl9jYWxsYmFjaywgYWRkX3Jlc2l6ZV9saXN0ZW5lciwgYWRkX3RyYW5zZm9ybSwgYWZ0ZXJVcGRhdGUsIGFwcGVuZCwgYXBwZW5kX2RldiwgYXNzaWduLCBhdHRyLCBhdHRyX2RldiwgYXR0cmlidXRlX3RvX29iamVjdCwgYmVmb3JlVXBkYXRlLCBiaW5kLCBiaW5kaW5nX2NhbGxiYWNrcywgYmxhbmtfb2JqZWN0LCBidWJibGUsIGNoZWNrX291dHJvcywgY2hpbGRyZW4sIGNsYWltX2NvbXBvbmVudCwgY2xhaW1fZWxlbWVudCwgY2xhaW1fc3BhY2UsIGNsYWltX3RleHQsIGNsZWFyX2xvb3BzLCBjb21wb25lbnRfc3Vic2NyaWJlLCBjb21wdXRlX3Jlc3RfcHJvcHMsIGNvbXB1dGVfc2xvdHMsIGNyZWF0ZUV2ZW50RGlzcGF0Y2hlciwgY3JlYXRlX2FuaW1hdGlvbiwgY3JlYXRlX2JpZGlyZWN0aW9uYWxfdHJhbnNpdGlvbiwgY3JlYXRlX2NvbXBvbmVudCwgY3JlYXRlX2luX3RyYW5zaXRpb24sIGNyZWF0ZV9vdXRfdHJhbnNpdGlvbiwgY3JlYXRlX3Nsb3QsIGNyZWF0ZV9zc3JfY29tcG9uZW50LCBjdXJyZW50X2NvbXBvbmVudCwgY3VzdG9tX2V2ZW50LCBkYXRhc2V0X2RldiwgZGVidWcsIGRlc3Ryb3lfYmxvY2ssIGRlc3Ryb3lfY29tcG9uZW50LCBkZXN0cm95X2VhY2gsIGRldGFjaCwgZGV0YWNoX2FmdGVyX2RldiwgZGV0YWNoX2JlZm9yZV9kZXYsIGRldGFjaF9iZXR3ZWVuX2RldiwgZGV0YWNoX2RldiwgZGlydHlfY29tcG9uZW50cywgZGlzcGF0Y2hfZGV2LCBlYWNoLCBlbGVtZW50LCBlbGVtZW50X2lzLCBlbXB0eSwgZXNjYXBlLCBlc2NhcGVkLCBleGNsdWRlX2ludGVybmFsX3Byb3BzLCBmaXhfYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9hbmRfb3V0cm9fYW5kX2Rlc3Ryb3lfYmxvY2ssIGZpeF9wb3NpdGlvbiwgZmx1c2gsIGdldENvbnRleHQsIGdldF9iaW5kaW5nX2dyb3VwX3ZhbHVlLCBnZXRfY3VycmVudF9jb21wb25lbnQsIGdldF9jdXN0b21fZWxlbWVudHNfc2xvdHMsIGdldF9zbG90X2NoYW5nZXMsIGdldF9zbG90X2NvbnRleHQsIGdldF9zcHJlYWRfb2JqZWN0LCBnZXRfc3ByZWFkX3VwZGF0ZSwgZ2V0X3N0b3JlX3ZhbHVlLCBnbG9iYWxzLCBncm91cF9vdXRyb3MsIGhhbmRsZV9wcm9taXNlLCBoYXNDb250ZXh0LCBoYXNfcHJvcCwgaWRlbnRpdHksIGluaXQsIGluc2VydCwgaW5zZXJ0X2RldiwgaW50cm9zLCBpbnZhbGlkX2F0dHJpYnV0ZV9uYW1lX2NoYXJhY3RlciwgaXNfY2xpZW50LCBpc19jcm9zc29yaWdpbiwgaXNfZW1wdHksIGlzX2Z1bmN0aW9uLCBpc19wcm9taXNlLCBsaXN0ZW4sIGxpc3Rlbl9kZXYsIGxvb3AsIGxvb3BfZ3VhcmQsIG1pc3NpbmdfY29tcG9uZW50LCBtb3VudF9jb21wb25lbnQsIG5vb3AsIG5vdF9lcXVhbCwgbm93LCBudWxsX3RvX2VtcHR5LCBvYmplY3Rfd2l0aG91dF9wcm9wZXJ0aWVzLCBvbkRlc3Ryb3ksIG9uTW91bnQsIG9uY2UsIG91dHJvX2FuZF9kZXN0cm95X2Jsb2NrLCBwcmV2ZW50X2RlZmF1bHQsIHByb3BfZGV2LCBxdWVyeV9zZWxlY3Rvcl9hbGwsIHJhZiwgcnVuLCBydW5fYWxsLCBzYWZlX25vdF9lcXVhbCwgc2NoZWR1bGVfdXBkYXRlLCBzZWxlY3RfbXVsdGlwbGVfdmFsdWUsIHNlbGVjdF9vcHRpb24sIHNlbGVjdF9vcHRpb25zLCBzZWxlY3RfdmFsdWUsIHNlbGYsIHNldENvbnRleHQsIHNldF9hdHRyaWJ1dGVzLCBzZXRfY3VycmVudF9jb21wb25lbnQsIHNldF9jdXN0b21fZWxlbWVudF9kYXRhLCBzZXRfZGF0YSwgc2V0X2RhdGFfZGV2LCBzZXRfaW5wdXRfdHlwZSwgc2V0X2lucHV0X3ZhbHVlLCBzZXRfbm93LCBzZXRfcmFmLCBzZXRfc3RvcmVfdmFsdWUsIHNldF9zdHlsZSwgc2V0X3N2Z19hdHRyaWJ1dGVzLCBzcGFjZSwgc3ByZWFkLCBzdG9wX3Byb3BhZ2F0aW9uLCBzdWJzY3JpYmUsIHN2Z19lbGVtZW50LCB0ZXh0LCB0aWNrLCB0aW1lX3Jhbmdlc190b19hcnJheSwgdG9fbnVtYmVyLCB0b2dnbGVfY2xhc3MsIHRyYW5zaXRpb25faW4sIHRyYW5zaXRpb25fb3V0LCB1cGRhdGVfa2V5ZWRfZWFjaCwgdXBkYXRlX3Nsb3QsIHVwZGF0ZV9zbG90X3NwcmVhZCwgdmFsaWRhdGVfY29tcG9uZW50LCB2YWxpZGF0ZV9lYWNoX2FyZ3VtZW50LCB2YWxpZGF0ZV9lYWNoX2tleXMsIHZhbGlkYXRlX3Nsb3RzLCB2YWxpZGF0ZV9zdG9yZSwgeGxpbmtfYXR0ciB9O1xuIiwiaW1wb3J0IHsgbm9vcCwgc2FmZV9ub3RfZXF1YWwsIHN1YnNjcmliZSwgcnVuX2FsbCwgaXNfZnVuY3Rpb24gfSBmcm9tICcuLi9pbnRlcm5hbC9pbmRleC5tanMnO1xuZXhwb3J0IHsgZ2V0X3N0b3JlX3ZhbHVlIGFzIGdldCB9IGZyb20gJy4uL2ludGVybmFsL2luZGV4Lm1qcyc7XG5cbmNvbnN0IHN1YnNjcmliZXJfcXVldWUgPSBbXTtcbi8qKlxuICogQ3JlYXRlcyBhIGBSZWFkYWJsZWAgc3RvcmUgdGhhdCBhbGxvd3MgcmVhZGluZyBieSBzdWJzY3JpcHRpb24uXG4gKiBAcGFyYW0gdmFsdWUgaW5pdGlhbCB2YWx1ZVxuICogQHBhcmFtIHtTdGFydFN0b3BOb3RpZmllcn1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHJlYWRhYmxlKHZhbHVlLCBzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN1YnNjcmliZTogd3JpdGFibGUodmFsdWUsIHN0YXJ0KS5zdWJzY3JpYmVcbiAgICB9O1xufVxuLyoqXG4gKiBDcmVhdGUgYSBgV3JpdGFibGVgIHN0b3JlIHRoYXQgYWxsb3dzIGJvdGggdXBkYXRpbmcgYW5kIHJlYWRpbmcgYnkgc3Vic2NyaXB0aW9uLlxuICogQHBhcmFtIHsqPX12YWx1ZSBpbml0aWFsIHZhbHVlXG4gKiBAcGFyYW0ge1N0YXJ0U3RvcE5vdGlmaWVyPX1zdGFydCBzdGFydCBhbmQgc3RvcCBub3RpZmljYXRpb25zIGZvciBzdWJzY3JpcHRpb25zXG4gKi9cbmZ1bmN0aW9uIHdyaXRhYmxlKHZhbHVlLCBzdGFydCA9IG5vb3ApIHtcbiAgICBsZXQgc3RvcDtcbiAgICBjb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuICAgIGZ1bmN0aW9uIHNldChuZXdfdmFsdWUpIHtcbiAgICAgICAgaWYgKHNhZmVfbm90X2VxdWFsKHZhbHVlLCBuZXdfdmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IG5ld192YWx1ZTtcbiAgICAgICAgICAgIGlmIChzdG9wKSB7IC8vIHN0b3JlIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgY29uc3QgcnVuX3F1ZXVlID0gIXN1YnNjcmliZXJfcXVldWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3Vic2NyaWJlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHN1YnNjcmliZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICBzWzFdKCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmliZXJfcXVldWUucHVzaChzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChydW5fcXVldWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlW2ldWzBdKHN1YnNjcmliZXJfcXVldWVbaSArIDFdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyX3F1ZXVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIHVwZGF0ZShmbikge1xuICAgICAgICBzZXQoZm4odmFsdWUpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlKHJ1biwgaW52YWxpZGF0ZSA9IG5vb3ApIHtcbiAgICAgICAgY29uc3Qgc3Vic2NyaWJlciA9IFtydW4sIGludmFsaWRhdGVdO1xuICAgICAgICBzdWJzY3JpYmVycy5wdXNoKHN1YnNjcmliZXIpO1xuICAgICAgICBpZiAoc3Vic2NyaWJlcnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBzdG9wID0gc3RhcnQoc2V0KSB8fCBub29wO1xuICAgICAgICB9XG4gICAgICAgIHJ1bih2YWx1ZSk7XG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpbmRleCA9IHN1YnNjcmliZXJzLmluZGV4T2Yoc3Vic2NyaWJlcik7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaWJlcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdWJzY3JpYmVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBzdG9wKCk7XG4gICAgICAgICAgICAgICAgc3RvcCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7IHNldCwgdXBkYXRlLCBzdWJzY3JpYmUgfTtcbn1cbmZ1bmN0aW9uIGRlcml2ZWQoc3RvcmVzLCBmbiwgaW5pdGlhbF92YWx1ZSkge1xuICAgIGNvbnN0IHNpbmdsZSA9ICFBcnJheS5pc0FycmF5KHN0b3Jlcyk7XG4gICAgY29uc3Qgc3RvcmVzX2FycmF5ID0gc2luZ2xlXG4gICAgICAgID8gW3N0b3Jlc11cbiAgICAgICAgOiBzdG9yZXM7XG4gICAgY29uc3QgYXV0byA9IGZuLmxlbmd0aCA8IDI7XG4gICAgcmV0dXJuIHJlYWRhYmxlKGluaXRpYWxfdmFsdWUsIChzZXQpID0+IHtcbiAgICAgICAgbGV0IGluaXRlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgICAgICAgbGV0IHBlbmRpbmcgPSAwO1xuICAgICAgICBsZXQgY2xlYW51cCA9IG5vb3A7XG4gICAgICAgIGNvbnN0IHN5bmMgPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocGVuZGluZykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKHNpbmdsZSA/IHZhbHVlc1swXSA6IHZhbHVlcywgc2V0KTtcbiAgICAgICAgICAgIGlmIChhdXRvKSB7XG4gICAgICAgICAgICAgICAgc2V0KHJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbGVhbnVwID0gaXNfZnVuY3Rpb24ocmVzdWx0KSA/IHJlc3VsdCA6IG5vb3A7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHVuc3Vic2NyaWJlcnMgPSBzdG9yZXNfYXJyYXkubWFwKChzdG9yZSwgaSkgPT4gc3Vic2NyaWJlKHN0b3JlLCAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHZhbHVlc1tpXSA9IHZhbHVlO1xuICAgICAgICAgICAgcGVuZGluZyAmPSB+KDEgPDwgaSk7XG4gICAgICAgICAgICBpZiAoaW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgc3luYygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICBwZW5kaW5nIHw9ICgxIDw8IGkpO1xuICAgICAgICB9KSk7XG4gICAgICAgIGluaXRlZCA9IHRydWU7XG4gICAgICAgIHN5bmMoKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICBydW5fYWxsKHVuc3Vic2NyaWJlcnMpO1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICB9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgeyBkZXJpdmVkLCByZWFkYWJsZSwgd3JpdGFibGUgfTtcbiIsImltcG9ydCB7IHdyaXRhYmxlIH0gZnJvbSAnc3ZlbHRlL3N0b3JlJztcblxuZXhwb3J0IGNvbnN0IENPTlRFWFRfS0VZID0ge307XG5cbmV4cG9ydCBjb25zdCBwcmVsb2FkID0gKCkgPT4gKHt9KTsiLCI8bmF2XG4gIGNsYXNzPVwibmF2YmFyIGlzLXByaW1hcnkgaGFzLXNoYWRvd1wiXG4gIHJvbGU9XCJuYXZpZ2F0aW9uXCJcbiAgYXJpYS1sYWJlbD1cIm1haW4gbmF2aWdhdGlvblwiXG4+XG4gIDxkaXYgY2xhc3M9XCJuYXZiYXItYnJhbmRcIj5cbiAgICA8YSBjbGFzcz1cIm5hdmJhci1pdGVtXCIgaHJlZj1cIi9cIj4gTXkgRGlhcnkgPC9hPlxuXG4gICAgPGFcbiAgICAgIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIlxuICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICBjbGFzcz1cIm5hdmJhci1idXJnZXIge2J1cmdldElzQWN0aXZlICYmICdpcy1hY3RpdmUnfVwiXG4gICAgICBhcmlhLWxhYmVsPVwibWVudVwiXG4gICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIlxuICAgICAgb246Y2xpY2s9XCJ7Y2xpY2tCdXJnZXJ9XCJcbiAgICA+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+XG4gICAgPC9hPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cIm5hdmJhci1tZW51IHtidXJnZXRJc0FjdGl2ZSAmJiAnaXMtYWN0aXZlJ31cIj5cbiAgICA8ZGl2IGNsYXNzPVwibmF2YmFyLWVuZFwiPlxuICAgICAgPGEgaHJlZj1cIi9cIiBjbGFzcz1cIm5hdmJhci1pdGVtXCI+TXkgQWNjb3VudDwvYT5cbiAgICAgIDxhIGhyZWY9XCIvXCIgY2xhc3M9XCJuYXZiYXItaXRlbVwiPlNldHRpbmc8L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC9uYXY+XG5cbjxzY3JpcHQ+XG4gIGxldCBidXJnZXRJc0FjdGl2ZSA9IGZhbHNlXG5cbiAgZnVuY3Rpb24gY2xpY2tCdXJnZXIoKSB7XG4gICAgYnVyZ2V0SXNBY3RpdmUgPSAhYnVyZ2V0SXNBY3RpdmVcbiAgfVxuPC9zY3JpcHQ+XG4iLG51bGwsImV4cG9ydCBjb25zdCBjYWxjdWxhdGVSZ2JhID0gKGlucHV0LCBvcGFjaXR5KSA9PiB7XHJcbiAgbGV0IGNvbG9yO1xyXG4gIGlmIChpbnB1dFswXSA9PT0gYCNgKSB7XHJcbiAgICBjb2xvciA9IGlucHV0LnNsaWNlKDEpO1xyXG4gIH1cclxuXHJcbiAgaWYgKGNvbG9yLmxlbmd0aCA9PT0gMykge1xyXG4gICAgbGV0IHJlcyA9IGBgO1xyXG4gICAgY29sb3Iuc3BsaXQoYGApLmZvckVhY2goYyA9PiB7XHJcbiAgICAgIHJlcyArPSBjO1xyXG4gICAgICByZXMgKz0gYztcclxuICAgIH0pO1xyXG4gICAgY29sb3IgPSByZXM7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZ2JWYWx1ZXMgPSBjb2xvclxyXG4gICAgLm1hdGNoKC8uezJ9L2cpXHJcbiAgICAubWFwKGhleCA9PiBwYXJzZUludChoZXgsIDE2KSlcclxuICAgIC5qb2luKGAsIGApO1xyXG4gIHJldHVybiBgcmdiYSgke3JnYlZhbHVlc30sICR7b3BhY2l0eX0pYDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByYW5nZSA9IChzaXplLCBzdGFydEF0ID0gMCkgPT5cclxuICBbLi4uQXJyYXkoc2l6ZSkua2V5cygpXS5tYXAoaSA9PiBpICsgc3RhcnRBdCk7XHJcblxyXG5leHBvcnQgY29uc3QgY2hhcmFjdGVyUmFuZ2UgPSAoc3RhcnRDaGFyLCBlbmRDaGFyKSA9PlxyXG4gIFN0cmluZy5mcm9tQ2hhckNvZGUoXHJcbiAgICAuLi5yYW5nZShcclxuICAgICAgZW5kQ2hhci5jaGFyQ29kZUF0KDApIC0gc3RhcnRDaGFyLmNoYXJDb2RlQXQoMCksXHJcbiAgICAgIHN0YXJ0Q2hhci5jaGFyQ29kZUF0KDApXHJcbiAgICApXHJcbiAgKTtcclxuXHJcbmV4cG9ydCBjb25zdCB6aXAgPSAoYXJyLCAuLi5hcnJzKSA9PlxyXG4gIGFyci5tYXAoKHZhbCwgaSkgPT4gYXJycy5yZWR1Y2UoKGxpc3QsIGN1cnIpID0+IFsuLi5saXN0LCBjdXJyW2ldXSwgW3ZhbF0pKTtcclxuIiwiPHNjcmlwdD5cclxuICBpbXBvcnQgeyByYW5nZSB9IGZyb20gXCIuL3V0aWxzXCI7XHJcbiAgZXhwb3J0IGxldCBzaXplID0gNjA7XHJcbiAgZXhwb3J0IGxldCBjb2xvciA9IFwiI0ZGM0UwMFwiO1xyXG4gIGV4cG9ydCBsZXQgdW5pdCA9IFwicHhcIjtcclxuPC9zY3JpcHQ+XHJcbjxzdHlsZT5cclxuICAud3JhcHBlciB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgd2lkdGg6IGNhbGModmFyKC0tc2l6ZSkgKiAyLjUpO1xyXG4gICAgaGVpZ2h0OiB2YXIoLS1zaXplKTtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgfVxyXG4gIC5iYXIge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiBjYWxjKHZhcigtLXNpemUpIC8gMTApO1xyXG4gICAgd2lkdGg6IGNhbGModmFyKC0tc2l6ZSkgLyA1KTtcclxuICAgIGhlaWdodDogY2FsYyh2YXIoLS1zaXplKSAvIDEwKTtcclxuICAgIG1hcmdpbi10b3A6IGNhbGModmFyKC0tc2l6ZSkgLSB2YXIoLS1zaXplKSAvIDEwKTtcclxuICAgIHRyYW5zZm9ybTogc2tld1koMGRlZyk7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jb2xvcik7XHJcbiAgICBhbmltYXRpb246IG1vdGlvbiAxLjI1cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcclxuICB9XHJcbiAgQGtleWZyYW1lcyBtb3Rpb24ge1xyXG4gICAgMjUlIHtcclxuICAgICAgdHJhbnNmb3JtOiBza2V3WSgyNWRlZyk7XHJcbiAgICB9XHJcbiAgICA1MCUge1xyXG4gICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgIG1hcmdpbi10b3A6IDA7XHJcbiAgICB9XHJcbiAgICA3NSUge1xyXG4gICAgICB0cmFuc2Zvcm06IHNrZXdZKC0yNWRlZyk7XHJcbiAgICB9XHJcbiAgfVxyXG48L3N0eWxlPlxyXG48ZGl2IGNsYXNzPVwid3JhcHBlclwiIHN0eWxlPVwiLS1zaXplOiB7c2l6ZX17dW5pdH07IC0tY29sb3I6IHtjb2xvcn1cIj5cclxuICB7I2VhY2ggcmFuZ2UoMTAsIDApIGFzIHZlcnNpb259XHJcbiAgPGRpdlxyXG4gICAgY2xhc3M9XCJiYXJcIlxyXG4gICAgc3R5bGU9XCJsZWZ0OiB7dmVyc2lvbiAqIChzaXplIC8gNSArIChzaXplIC8gMTUgLSBzaXplIC8gMTAwKSkrdW5pdH07IGFuaW1hdGlvbi1kZWxheToge3ZlcnNpb24gKiAwLjE1fXM7XCJcclxuICA+PC9kaXY+XHJcbiAgey9lYWNofVxyXG48L2Rpdj5cclxuIiwiPHN0eWxlPlxuICAubG9hZGluZy13cmFwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJhY2tncm91bmRDb2xvcik7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDB2aDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG48L3N0eWxlPlxuXG48bWFpbiBjbGFzcz1cImxvYWRpbmctd3JhcFwiIHN0eWxlPVwiLS1iYWNrZ3JvdW5kQ29sb3I6IHtiYWNrZ3JvdW5kQ29sb3J9XCI+XG4gIDxXYXZlIGNvbG9yPVwie2NvbG9yfVwiIC8+XG48L21haW4+XG5cbjxzY3JpcHQgbGFuZz1cInRzXCI+XG4gIGltcG9ydCBXYXZlIGZyb20gJ3N2ZWx0ZS1sb2FkaW5nLXNwaW5uZXJzL3NyYy9XYXZlLnN2ZWx0ZSdcblxuICBleHBvcnQgbGV0IGJhY2tncm91bmRDb2xvciA9ICcjRjI0NzY3J1xuICBleHBvcnQgbGV0IGNvbG9yID0gJyNGRkZGRkYnXG48L3NjcmlwdD5cbiIsIjxzdHlsZT5cbjwvc3R5bGU+XG5cbnsjaWYgJGxvYWRpbmdTdG9yZX1cbiAgPExvYWRpbmcgLz5cbns6ZWxzZX1cbiAgPEhlYWRlciAvPlxuICA8bWFpbiBjbGFzcz1cImNvbnRhaW5lciBwdC02XCI+XG4gICAgPHNsb3QgLz5cbiAgPC9tYWluPlxuey9pZn1cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbiAgaW1wb3J0ICdidWxtYS9jc3MvYnVsbWEuY3NzJ1xuICBpbXBvcnQgSGVhZGVyIGZyb20gJ0AvY29tcG9uZW50cy9IZWFkZXIuc3ZlbHRlJ1xuICBpbXBvcnQgeyBsb2FkaW5nU3RvcmUgfSBmcm9tICdAL3N0b3JlL0xvYWRpbmdTdG9yZSdcbiAgaW1wb3J0IExvYWRpbmcgZnJvbSAnQC9jb21wb25lbnRzL1dhdmVMb2FkaW5nLnN2ZWx0ZSdcblxuICBvbk1vdW50KCgpID0+IHtcbiAgICBsb2FkaW5nU3RvcmUuY29tcGxldGUoKVxuICB9KVxuPC9zY3JpcHQ+XG4iLCI8c2NyaXB0IGxhbmc9XCJ0c1wiPlxuXHRleHBvcnQgbGV0IHN0YXR1czogbnVtYmVyO1xuXHRleHBvcnQgbGV0IGVycm9yOiBFcnJvcjtcblxuXHRjb25zdCBkZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jztcbjwvc2NyaXB0PlxuXG48c3R5bGU+XG5cdGgxLCBwIHtcblx0XHRtYXJnaW46IDAgYXV0bztcblx0fVxuXG5cdGgxIHtcblx0XHRmb250LXNpemU6IDIuOGVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdFx0bWFyZ2luOiAwIDAgMC41ZW0gMDtcblx0fVxuXG5cdHAge1xuXHRcdG1hcmdpbjogMWVtIGF1dG87XG5cdH1cblxuXHRAbWVkaWEgKG1pbi13aWR0aDogNDgwcHgpIHtcblx0XHRoMSB7XG5cdFx0XHRmb250LXNpemU6IDRlbTtcblx0XHR9XG5cdH1cbjwvc3R5bGU+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPntzdGF0dXN9PC90aXRsZT5cbjwvc3ZlbHRlOmhlYWQ+XG5cbjxoMT57c3RhdHVzfTwvaDE+XG5cbjxwPntlcnJvci5tZXNzYWdlfTwvcD5cblxueyNpZiBkZXYgJiYgZXJyb3Iuc3RhY2t9XG5cdDxwcmU+e2Vycm9yLnN0YWNrfTwvcHJlPlxuey9pZn1cbiIsIjwhLS0gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBTYXBwZXIg4oCUIGRvIG5vdCBlZGl0IGl0ISAtLT5cbjxzY3JpcHQ+XG5cdGltcG9ydCB7IHNldENvbnRleHQsIGFmdGVyVXBkYXRlIH0gZnJvbSAnc3ZlbHRlJztcblx0aW1wb3J0IHsgQ09OVEVYVF9LRVkgfSBmcm9tICcuL3NoYXJlZCc7XG5cdGltcG9ydCBMYXlvdXQgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlJztcblx0aW1wb3J0IEVycm9yIGZyb20gJy4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlJztcblxuXHRleHBvcnQgbGV0IHN0b3Jlcztcblx0ZXhwb3J0IGxldCBlcnJvcjtcblx0ZXhwb3J0IGxldCBzdGF0dXM7XG5cdGV4cG9ydCBsZXQgc2VnbWVudHM7XG5cdGV4cG9ydCBsZXQgbGV2ZWwwO1xuXHRleHBvcnQgbGV0IGxldmVsMSA9IG51bGw7XG5cdGV4cG9ydCBsZXQgbGV2ZWwyID0gbnVsbDtcblx0ZXhwb3J0IGxldCBub3RpZnk7XG5cblx0YWZ0ZXJVcGRhdGUobm90aWZ5KTtcblx0c2V0Q29udGV4dChDT05URVhUX0tFWSwgc3RvcmVzKTtcbjwvc2NyaXB0PlxuXG48TGF5b3V0IHNlZ21lbnQ9XCJ7c2VnbWVudHNbMF19XCIgey4uLmxldmVsMC5wcm9wc30+XG5cdHsjaWYgZXJyb3J9XG5cdFx0PEVycm9yIHtlcnJvcn0ge3N0YXR1c30vPlxuXHR7OmVsc2V9XG5cdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz1cIntsZXZlbDEuY29tcG9uZW50fVwiIHNlZ21lbnQ9XCJ7c2VnbWVudHNbMV19XCIgey4uLmxldmVsMS5wcm9wc30+XG5cdFx0XHR7I2lmIGxldmVsMn1cblx0XHRcdFx0PHN2ZWx0ZTpjb21wb25lbnQgdGhpcz1cIntsZXZlbDIuY29tcG9uZW50fVwiIHsuLi5sZXZlbDIucHJvcHN9Lz5cblx0XHRcdHsvaWZ9XG5cdFx0PC9zdmVsdGU6Y29tcG9uZW50PlxuXHR7L2lmfVxuPC9MYXlvdXQ+IiwiLy8gVGhpcyBmaWxlIGlzIGdlbmVyYXRlZCBieSBTYXBwZXIg4oCUIGRvIG5vdCBlZGl0IGl0IVxuLy8gd2VicGFjayBkb2VzIG5vdCBzdXBwb3J0IGV4cG9ydCAqIGFzIHJvb3RfY29tcCB5ZXQgc28gZG8gYSB0d28gbGluZSBpbXBvcnQvZXhwb3J0XG5pbXBvcnQgKiBhcyByb290X2NvbXAgZnJvbSAnLi4vLi4vLi4vcm91dGVzL19sYXlvdXQuc3ZlbHRlJztcbmV4cG9ydCB7IHJvb3RfY29tcCB9O1xuZXhwb3J0IHsgZGVmYXVsdCBhcyBFcnJvckNvbXBvbmVudCB9IGZyb20gJy4uLy4uLy4uL3JvdXRlcy9fZXJyb3Iuc3ZlbHRlJztcblxuZXhwb3J0IGNvbnN0IGlnbm9yZSA9IFsvXlxcL2Jsb2dcXC5qc29uJC8sIC9eXFwvYmxvZ1xcLyhbXi9dKz8pXFwuanNvbiQvXTtcblxuZXhwb3J0IGNvbnN0IGNvbXBvbmVudHMgPSBbXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL2luZGV4LnN2ZWx0ZVwiKVxuXHR9LFxuXHR7XG5cdFx0anM6ICgpID0+IGltcG9ydChcIi4uLy4uLy4uL3JvdXRlcy9sb2dpbi9fbGF5b3V0LnN2ZWx0ZVwiKVxuXHR9LFxuXHR7XG5cdFx0anM6ICgpID0+IGltcG9ydChcIi4uLy4uLy4uL3JvdXRlcy9sb2dpbi9pbmRleC5zdmVsdGVcIilcblx0fSxcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoXCIuLi8uLi8uLi9yb3V0ZXMvd3JpdGUvX2xheW91dC5zdmVsdGVcIilcblx0fSxcblx0e1xuXHRcdGpzOiAoKSA9PiBpbXBvcnQoXCIuLi8uLi8uLi9yb3V0ZXMvd3JpdGUvaW5kZXguc3ZlbHRlXCIpXG5cdH0sXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL2Jsb2cvaW5kZXguc3ZlbHRlXCIpXG5cdH0sXG5cdHtcblx0XHRqczogKCkgPT4gaW1wb3J0KFwiLi4vLi4vLi4vcm91dGVzL2Jsb2cvW3NsdWddLnN2ZWx0ZVwiKVxuXHR9LFxuXHR7XG5cdFx0anM6ICgpID0+IGltcG9ydChcIi4uLy4uLy4uL3JvdXRlcy9jaGF0L2luZGV4LnN2ZWx0ZVwiKVxuXHR9XG5dO1xuXG5leHBvcnQgY29uc3Qgcm91dGVzID0gKGQgPT4gW1xuXHR7XG5cdFx0Ly8gaW5kZXguc3ZlbHRlXG5cdFx0cGF0dGVybjogL15cXC8kLyxcblx0XHRwYXJ0czogW1xuXHRcdFx0eyBpOiAwIH1cblx0XHRdXG5cdH0sXG5cblx0e1xuXHRcdC8vIGxvZ2luL2luZGV4LnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvbG9naW5cXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdHsgaTogMSB9LFxuXHRcdFx0eyBpOiAyIH1cblx0XHRdXG5cdH0sXG5cblx0e1xuXHRcdC8vIHdyaXRlL2luZGV4LnN2ZWx0ZVxuXHRcdHBhdHRlcm46IC9eXFwvd3JpdGVcXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdHsgaTogMyB9LFxuXHRcdFx0eyBpOiA0IH1cblx0XHRdXG5cdH0sXG5cblx0e1xuXHRcdC8vIGJsb2cvaW5kZXguc3ZlbHRlXG5cdFx0cGF0dGVybjogL15cXC9ibG9nXFwvPyQvLFxuXHRcdHBhcnRzOiBbXG5cdFx0XHR7IGk6IDUgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gYmxvZy9bc2x1Z10uc3ZlbHRlXG5cdFx0cGF0dGVybjogL15cXC9ibG9nXFwvKFteL10rPylcXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdG51bGwsXG5cdFx0XHR7IGk6IDYsIHBhcmFtczogbWF0Y2ggPT4gKHsgc2x1ZzogZChtYXRjaFsxXSkgfSkgfVxuXHRcdF1cblx0fSxcblxuXHR7XG5cdFx0Ly8gY2hhdC9pbmRleC5zdmVsdGVcblx0XHRwYXR0ZXJuOiAvXlxcL2NoYXRcXC8/JC8sXG5cdFx0cGFydHM6IFtcblx0XHRcdHsgaTogNyB9XG5cdFx0XVxuXHR9XG5dKShkZWNvZGVVUklDb21wb25lbnQpO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0aW1wb3J0KFwiL1VzZXJzL2FsMDE1NzUwNjgvcHJvamVjdC9wZXJzb24vZGlhcnkvbm9kZV9tb2R1bGVzL3NhcHBlci9zYXBwZXItZGV2LWNsaWVudC5qc1wiKS50aGVuKGNsaWVudCA9PiB7XG5cdFx0Y2xpZW50LmNvbm5lY3QoMTAwMDApO1xuXHR9KTtcbn0iLCJpbXBvcnQgeyBnZXRDb250ZXh0IH0gZnJvbSAnc3ZlbHRlJztcbmltcG9ydCB7IENPTlRFWFRfS0VZIH0gZnJvbSAnLi9pbnRlcm5hbC9zaGFyZWQnO1xuaW1wb3J0IHsgd3JpdGFibGUgfSBmcm9tICdzdmVsdGUvc3RvcmUnO1xuaW1wb3J0IEFwcCBmcm9tICcuL2ludGVybmFsL0FwcC5zdmVsdGUnO1xuaW1wb3J0IHsgaWdub3JlLCByb3V0ZXMsIHJvb3RfY29tcCwgY29tcG9uZW50cywgRXJyb3JDb21wb25lbnQgfSBmcm9tICcuL2ludGVybmFsL21hbmlmZXN0LWNsaWVudCc7XG5cbi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XG5cbmZ1bmN0aW9uIGZpbmRfYW5jaG9yKG5vZGUpIHtcclxuICAgIHdoaWxlIChub2RlICYmIG5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKSAhPT0gJ0EnKVxyXG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7IC8vIFNWRyA8YT4gZWxlbWVudHMgaGF2ZSBhIGxvd2VyY2FzZSBuYW1lXHJcbiAgICByZXR1cm4gbm9kZTtcclxufVxuXG5sZXQgdWlkID0gMTtcclxuZnVuY3Rpb24gc2V0X3VpZChuKSB7XHJcbiAgICB1aWQgPSBuO1xyXG59XHJcbmxldCBjaWQ7XHJcbmZ1bmN0aW9uIHNldF9jaWQobikge1xyXG4gICAgY2lkID0gbjtcclxufVxyXG5jb25zdCBfaGlzdG9yeSA9IHR5cGVvZiBoaXN0b3J5ICE9PSAndW5kZWZpbmVkJyA/IGhpc3RvcnkgOiB7XHJcbiAgICBwdXNoU3RhdGU6ICgpID0+IHsgfSxcclxuICAgIHJlcGxhY2VTdGF0ZTogKCkgPT4geyB9LFxyXG4gICAgc2Nyb2xsUmVzdG9yYXRpb246ICdhdXRvJ1xyXG59O1xyXG5jb25zdCBzY3JvbGxfaGlzdG9yeSA9IHt9O1xyXG5mdW5jdGlvbiBsb2FkX2N1cnJlbnRfcGFnZSgpIHtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICBjb25zdCB7IGhhc2gsIGhyZWYgfSA9IGxvY2F0aW9uO1xyXG4gICAgICAgIF9oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7IGlkOiB1aWQgfSwgJycsIGhyZWYpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQobmV3IFVSTChsb2NhdGlvbi5ocmVmKSk7XHJcbiAgICAgICAgaWYgKHRhcmdldClcclxuICAgICAgICAgICAgcmV0dXJuIG5hdmlnYXRlKHRhcmdldCwgdWlkLCB0cnVlLCBoYXNoKTtcclxuICAgIH0pO1xyXG59XHJcbmxldCBiYXNlX3VybDtcclxubGV0IGhhbmRsZV90YXJnZXQ7XHJcbmZ1bmN0aW9uIGluaXQoYmFzZSwgaGFuZGxlcikge1xyXG4gICAgYmFzZV91cmwgPSBiYXNlO1xyXG4gICAgaGFuZGxlX3RhcmdldCA9IGhhbmRsZXI7XHJcbiAgICBpZiAoJ3Njcm9sbFJlc3RvcmF0aW9uJyBpbiBfaGlzdG9yeSkge1xyXG4gICAgICAgIF9oaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCc7XHJcbiAgICB9XHJcbiAgICAvLyBBZG9wdGVkIGZyb20gTnV4dC5qc1xyXG4gICAgLy8gUmVzZXQgc2Nyb2xsUmVzdG9yYXRpb24gdG8gYXV0byB3aGVuIGxlYXZpbmcgcGFnZSwgYWxsb3dpbmcgcGFnZSByZWxvYWRcclxuICAgIC8vIGFuZCBiYWNrLW5hdmlnYXRpb24gZnJvbSBvdGhlciBwYWdlcyB0byB1c2UgdGhlIGJyb3dzZXIgdG8gcmVzdG9yZSB0aGVcclxuICAgIC8vIHNjcm9sbGluZyBwb3NpdGlvbi5cclxuICAgIGFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHtcclxuICAgICAgICBfaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdhdXRvJztcclxuICAgIH0pO1xyXG4gICAgLy8gU2V0dGluZyBzY3JvbGxSZXN0b3JhdGlvbiB0byBtYW51YWwgYWdhaW4gd2hlbiByZXR1cm5pbmcgdG8gdGhpcyBwYWdlLlxyXG4gICAgYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcclxuICAgICAgICBfaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnO1xyXG4gICAgfSk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZV9jbGljayk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGhhbmRsZV9wb3BzdGF0ZSk7XHJcbn1cclxuZnVuY3Rpb24gZXh0cmFjdF9xdWVyeShzZWFyY2gpIHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcclxuICAgIGlmIChzZWFyY2gubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHNlYXJjaC5zbGljZSgxKS5zcGxpdCgnJicpLmZvckVhY2goc2VhcmNoUGFyYW0gPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBbLCBrZXksIHZhbHVlID0gJyddID0gLyhbXj1dKikoPzo9KC4qKSk/Ly5leGVjKGRlY29kZVVSSUNvbXBvbmVudChzZWFyY2hQYXJhbS5yZXBsYWNlKC9cXCsvZywgJyAnKSkpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHF1ZXJ5W2tleV0gPT09ICdzdHJpbmcnKVxyXG4gICAgICAgICAgICAgICAgcXVlcnlba2V5XSA9IFtxdWVyeVtrZXldXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWVyeVtrZXldID09PSAnb2JqZWN0JylcclxuICAgICAgICAgICAgICAgIHF1ZXJ5W2tleV0ucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBxdWVyeTtcclxufVxyXG5mdW5jdGlvbiBzZWxlY3RfdGFyZ2V0KHVybCkge1xyXG4gICAgaWYgKHVybC5vcmlnaW4gIT09IGxvY2F0aW9uLm9yaWdpbilcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIGlmICghdXJsLnBhdGhuYW1lLnN0YXJ0c1dpdGgoYmFzZV91cmwpKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgbGV0IHBhdGggPSB1cmwucGF0aG5hbWUuc2xpY2UoYmFzZV91cmwubGVuZ3RoKTtcclxuICAgIGlmIChwYXRoID09PSAnJykge1xyXG4gICAgICAgIHBhdGggPSAnLyc7XHJcbiAgICB9XHJcbiAgICAvLyBhdm9pZCBhY2NpZGVudGFsIGNsYXNoZXMgYmV0d2VlbiBzZXJ2ZXIgcm91dGVzIGFuZCBwYWdlIHJvdXRlc1xyXG4gICAgaWYgKGlnbm9yZS5zb21lKHBhdHRlcm4gPT4gcGF0dGVybi50ZXN0KHBhdGgpKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvdXRlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGNvbnN0IHJvdXRlID0gcm91dGVzW2ldO1xyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gcm91dGUucGF0dGVybi5leGVjKHBhdGgpO1xyXG4gICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IGV4dHJhY3RfcXVlcnkodXJsLnNlYXJjaCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnQgPSByb3V0ZS5wYXJ0c1tyb3V0ZS5wYXJ0cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0gcGFydC5wYXJhbXMgPyBwYXJ0LnBhcmFtcyhtYXRjaCkgOiB7fTtcclxuICAgICAgICAgICAgY29uc3QgcGFnZSA9IHsgaG9zdDogbG9jYXRpb24uaG9zdCwgcGF0aCwgcXVlcnksIHBhcmFtcyB9O1xyXG4gICAgICAgICAgICByZXR1cm4geyBocmVmOiB1cmwuaHJlZiwgcm91dGUsIG1hdGNoLCBwYWdlIH07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGhhbmRsZV9jbGljayhldmVudCkge1xyXG4gICAgLy8gQWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS92aXNpb25tZWRpYS9wYWdlLmpzXHJcbiAgICAvLyBNSVQgbGljZW5zZSBodHRwczovL2dpdGh1Yi5jb20vdmlzaW9ubWVkaWEvcGFnZS5qcyNsaWNlbnNlXHJcbiAgICBpZiAod2hpY2goZXZlbnQpICE9PSAxKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGlmIChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5KVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGlmIChldmVudC5kZWZhdWx0UHJldmVudGVkKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IGEgPSBmaW5kX2FuY2hvcihldmVudC50YXJnZXQpO1xyXG4gICAgaWYgKCFhKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGlmICghYS5ocmVmKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIC8vIGNoZWNrIGlmIGxpbmsgaXMgaW5zaWRlIGFuIHN2Z1xyXG4gICAgLy8gaW4gdGhpcyBjYXNlLCBib3RoIGhyZWYgYW5kIHRhcmdldCBhcmUgYWx3YXlzIGluc2lkZSBhbiBvYmplY3RcclxuICAgIGNvbnN0IHN2ZyA9IHR5cGVvZiBhLmhyZWYgPT09ICdvYmplY3QnICYmIGEuaHJlZi5jb25zdHJ1Y3Rvci5uYW1lID09PSAnU1ZHQW5pbWF0ZWRTdHJpbmcnO1xyXG4gICAgY29uc3QgaHJlZiA9IFN0cmluZyhzdmcgPyBhLmhyZWYuYmFzZVZhbCA6IGEuaHJlZik7XHJcbiAgICBpZiAoaHJlZiA9PT0gbG9jYXRpb24uaHJlZikge1xyXG4gICAgICAgIGlmICghbG9jYXRpb24uaGFzaClcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyBJZ25vcmUgaWYgdGFnIGhhc1xyXG4gICAgLy8gMS4gJ2Rvd25sb2FkJyBhdHRyaWJ1dGVcclxuICAgIC8vIDIuIHJlbD0nZXh0ZXJuYWwnIGF0dHJpYnV0ZVxyXG4gICAgaWYgKGEuaGFzQXR0cmlidXRlKCdkb3dubG9hZCcpIHx8IGEuZ2V0QXR0cmlidXRlKCdyZWwnKSA9PT0gJ2V4dGVybmFsJylcclxuICAgICAgICByZXR1cm47XHJcbiAgICAvLyBJZ25vcmUgaWYgPGE+IGhhcyBhIHRhcmdldFxyXG4gICAgaWYgKHN2ZyA/IGEudGFyZ2V0LmJhc2VWYWwgOiBhLnRhcmdldClcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGhyZWYpO1xyXG4gICAgLy8gRG9uJ3QgaGFuZGxlIGhhc2ggY2hhbmdlc1xyXG4gICAgaWYgKHVybC5wYXRobmFtZSA9PT0gbG9jYXRpb24ucGF0aG5hbWUgJiYgdXJsLnNlYXJjaCA9PT0gbG9jYXRpb24uc2VhcmNoKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQodXJsKTtcclxuICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICBjb25zdCBub3Njcm9sbCA9IGEuaGFzQXR0cmlidXRlKCdzYXBwZXI6bm9zY3JvbGwnKTtcclxuICAgICAgICBuYXZpZ2F0ZSh0YXJnZXQsIG51bGwsIG5vc2Nyb2xsLCB1cmwuaGFzaCk7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBfaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogY2lkIH0sICcnLCB1cmwuaHJlZik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gd2hpY2goZXZlbnQpIHtcclxuICAgIHJldHVybiBldmVudC53aGljaCA9PT0gbnVsbCA/IGV2ZW50LmJ1dHRvbiA6IGV2ZW50LndoaWNoO1xyXG59XHJcbmZ1bmN0aW9uIHNjcm9sbF9zdGF0ZSgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogcGFnZVhPZmZzZXQsXHJcbiAgICAgICAgeTogcGFnZVlPZmZzZXRcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gaGFuZGxlX3BvcHN0YXRlKGV2ZW50KSB7XHJcbiAgICBzY3JvbGxfaGlzdG9yeVtjaWRdID0gc2Nyb2xsX3N0YXRlKCk7XHJcbiAgICBpZiAoZXZlbnQuc3RhdGUpIHtcclxuICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHNlbGVjdF90YXJnZXQodXJsKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIG5hdmlnYXRlKHRhcmdldCwgZXZlbnQuc3RhdGUuaWQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBsb2NhdGlvbi5ocmVmOyAvLyBub3NvbmFyXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgLy8gaGFzaGNoYW5nZVxyXG4gICAgICAgIHNldF91aWQodWlkICsgMSk7XHJcbiAgICAgICAgc2V0X2NpZCh1aWQpO1xyXG4gICAgICAgIF9oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7IGlkOiBjaWQgfSwgJycsIGxvY2F0aW9uLmhyZWYpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIG5hdmlnYXRlKGRlc3QsIGlkLCBub3Njcm9sbCwgaGFzaCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCBwb3BzdGF0ZSA9ICEhaWQ7XHJcbiAgICAgICAgaWYgKHBvcHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGNpZCA9IGlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudF9zY3JvbGwgPSBzY3JvbGxfc3RhdGUoKTtcclxuICAgICAgICAgICAgLy8gY2xpY2tlZCBvbiBhIGxpbmsuIHByZXNlcnZlIHNjcm9sbCBzdGF0ZVxyXG4gICAgICAgICAgICBzY3JvbGxfaGlzdG9yeVtjaWRdID0gY3VycmVudF9zY3JvbGw7XHJcbiAgICAgICAgICAgIGNpZCA9IGlkID0gKyt1aWQ7XHJcbiAgICAgICAgICAgIHNjcm9sbF9oaXN0b3J5W2NpZF0gPSBub3Njcm9sbCA/IGN1cnJlbnRfc2Nyb2xsIDogeyB4OiAwLCB5OiAwIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHlpZWxkIGhhbmRsZV90YXJnZXQoZGVzdCk7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xyXG4gICAgICAgIGlmICghbm9zY3JvbGwpIHtcclxuICAgICAgICAgICAgbGV0IHNjcm9sbCA9IHNjcm9sbF9oaXN0b3J5W2lkXTtcclxuICAgICAgICAgICAgbGV0IGRlZXBfbGlua2VkO1xyXG4gICAgICAgICAgICBpZiAoaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2Nyb2xsIGlzIGFuIGVsZW1lbnQgaWQgKGZyb20gYSBoYXNoKSwgd2UgbmVlZCB0byBjb21wdXRlIHkuXHJcbiAgICAgICAgICAgICAgICBkZWVwX2xpbmtlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2guc2xpY2UoMSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlZXBfbGlua2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBkZWVwX2xpbmtlZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgKyBzY3JvbGxZXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY3JvbGxfaGlzdG9yeVtjaWRdID0gc2Nyb2xsO1xyXG4gICAgICAgICAgICBpZiAocG9wc3RhdGUgfHwgZGVlcF9saW5rZWQpIHtcclxuICAgICAgICAgICAgICAgIHNjcm9sbFRvKHNjcm9sbC54LCBzY3JvbGwueSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxUbygwLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XG5cbmZ1bmN0aW9uIGdldF9iYXNlX3VyaSh3aW5kb3dfZG9jdW1lbnQpIHtcclxuICAgIGxldCBiYXNlVVJJID0gd2luZG93X2RvY3VtZW50LmJhc2VVUkk7XHJcbiAgICBpZiAoIWJhc2VVUkkpIHtcclxuICAgICAgICBjb25zdCBiYXNlVGFncyA9IHdpbmRvd19kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYmFzZScpO1xyXG4gICAgICAgIGJhc2VVUkkgPSBiYXNlVGFncy5sZW5ndGggPyBiYXNlVGFnc1swXS5ocmVmIDogd2luZG93X2RvY3VtZW50LlVSTDtcclxuICAgIH1cclxuICAgIHJldHVybiBiYXNlVVJJO1xyXG59XG5cbmxldCBwcmVmZXRjaGluZyA9IG51bGw7XHJcbmxldCBtb3VzZW1vdmVfdGltZW91dDtcclxuZnVuY3Rpb24gc3RhcnQoKSB7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdHJpZ2dlcl9wcmVmZXRjaCk7XHJcbiAgICBhZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVfbW91c2Vtb3ZlKTtcclxufVxyXG5mdW5jdGlvbiBwcmVmZXRjaChocmVmKSB7XHJcbiAgICBjb25zdCB0YXJnZXQgPSBzZWxlY3RfdGFyZ2V0KG5ldyBVUkwoaHJlZiwgZ2V0X2Jhc2VfdXJpKGRvY3VtZW50KSkpO1xyXG4gICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgIGlmICghcHJlZmV0Y2hpbmcgfHwgaHJlZiAhPT0gcHJlZmV0Y2hpbmcuaHJlZikge1xyXG4gICAgICAgICAgICBwcmVmZXRjaGluZyA9IHsgaHJlZiwgcHJvbWlzZTogaHlkcmF0ZV90YXJnZXQodGFyZ2V0KSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJlZmV0Y2hpbmcucHJvbWlzZTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBnZXRfcHJlZmV0Y2hlZCh0YXJnZXQpIHtcclxuICAgIGlmIChwcmVmZXRjaGluZyAmJiBwcmVmZXRjaGluZy5ocmVmID09PSB0YXJnZXQuaHJlZikge1xyXG4gICAgICAgIHJldHVybiBwcmVmZXRjaGluZy5wcm9taXNlO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGh5ZHJhdGVfdGFyZ2V0KHRhcmdldCk7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gdHJpZ2dlcl9wcmVmZXRjaChldmVudCkge1xyXG4gICAgY29uc3QgYSA9IGZpbmRfYW5jaG9yKGV2ZW50LnRhcmdldCk7XHJcbiAgICBpZiAoYSAmJiBhLnJlbCA9PT0gJ3ByZWZldGNoJykge1xyXG4gICAgICAgIHByZWZldGNoKGEuaHJlZik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaGFuZGxlX21vdXNlbW92ZShldmVudCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KG1vdXNlbW92ZV90aW1lb3V0KTtcclxuICAgIG1vdXNlbW92ZV90aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdHJpZ2dlcl9wcmVmZXRjaChldmVudCk7XHJcbiAgICB9LCAyMCk7XHJcbn1cblxuZnVuY3Rpb24gZ290byhocmVmLCBvcHRzID0geyBub3Njcm9sbDogZmFsc2UsIHJlcGxhY2VTdGF0ZTogZmFsc2UgfSkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gc2VsZWN0X3RhcmdldChuZXcgVVJMKGhyZWYsIGdldF9iYXNlX3VyaShkb2N1bWVudCkpKTtcclxuICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICBfaGlzdG9yeVtvcHRzLnJlcGxhY2VTdGF0ZSA/ICdyZXBsYWNlU3RhdGUnIDogJ3B1c2hTdGF0ZSddKHsgaWQ6IGNpZCB9LCAnJywgaHJlZik7XHJcbiAgICAgICAgcmV0dXJuIG5hdmlnYXRlKHRhcmdldCwgbnVsbCwgb3B0cy5ub3Njcm9sbCk7XHJcbiAgICB9XHJcbiAgICBsb2NhdGlvbi5ocmVmID0gaHJlZjtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKSA9PiB7XHJcbiAgICAgICAgLyogbmV2ZXIgcmVzb2x2ZXMgKi9cclxuICAgIH0pO1xyXG59XG5cbmZ1bmN0aW9uIHBhZ2Vfc3RvcmUodmFsdWUpIHtcclxuICAgIGNvbnN0IHN0b3JlID0gd3JpdGFibGUodmFsdWUpO1xyXG4gICAgbGV0IHJlYWR5ID0gdHJ1ZTtcclxuICAgIGZ1bmN0aW9uIG5vdGlmeSgpIHtcclxuICAgICAgICByZWFkeSA9IHRydWU7XHJcbiAgICAgICAgc3RvcmUudXBkYXRlKHZhbCA9PiB2YWwpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0KG5ld192YWx1ZSkge1xyXG4gICAgICAgIHJlYWR5ID0gZmFsc2U7XHJcbiAgICAgICAgc3RvcmUuc2V0KG5ld192YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUocnVuKSB7XHJcbiAgICAgICAgbGV0IG9sZF92YWx1ZTtcclxuICAgICAgICByZXR1cm4gc3RvcmUuc3Vic2NyaWJlKChuZXdfdmFsdWUpID0+IHtcclxuICAgICAgICAgICAgaWYgKG9sZF92YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IChyZWFkeSAmJiBuZXdfdmFsdWUgIT09IG9sZF92YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIHJ1bihvbGRfdmFsdWUgPSBuZXdfdmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4geyBub3RpZnksIHNldCwgc3Vic2NyaWJlIH07XHJcbn1cblxuY29uc3QgaW5pdGlhbF9kYXRhID0gdHlwZW9mIF9fU0FQUEVSX18gIT09ICd1bmRlZmluZWQnICYmIF9fU0FQUEVSX187XHJcbmxldCByZWFkeSA9IGZhbHNlO1xyXG5sZXQgcm9vdF9jb21wb25lbnQ7XHJcbmxldCBjdXJyZW50X3Rva2VuO1xyXG5sZXQgcm9vdF9wcmVsb2FkZWQ7XHJcbmxldCBjdXJyZW50X2JyYW5jaCA9IFtdO1xyXG5sZXQgY3VycmVudF9xdWVyeSA9ICd7fSc7XHJcbmNvbnN0IHN0b3JlcyA9IHtcclxuICAgIHBhZ2U6IHBhZ2Vfc3RvcmUoe30pLFxyXG4gICAgcHJlbG9hZGluZzogd3JpdGFibGUobnVsbCksXHJcbiAgICBzZXNzaW9uOiB3cml0YWJsZShpbml0aWFsX2RhdGEgJiYgaW5pdGlhbF9kYXRhLnNlc3Npb24pXHJcbn07XHJcbmxldCAkc2Vzc2lvbjtcclxubGV0IHNlc3Npb25fZGlydHk7XHJcbnN0b3Jlcy5zZXNzaW9uLnN1YnNjcmliZSgodmFsdWUpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgJHNlc3Npb24gPSB2YWx1ZTtcclxuICAgIGlmICghcmVhZHkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgc2Vzc2lvbl9kaXJ0eSA9IHRydWU7XHJcbiAgICBjb25zdCBkZXN0ID0gc2VsZWN0X3RhcmdldChuZXcgVVJMKGxvY2F0aW9uLmhyZWYpKTtcclxuICAgIGNvbnN0IHRva2VuID0gY3VycmVudF90b2tlbiA9IHt9O1xyXG4gICAgY29uc3QgeyByZWRpcmVjdCwgcHJvcHMsIGJyYW5jaCB9ID0geWllbGQgaHlkcmF0ZV90YXJnZXQoZGVzdCk7XHJcbiAgICBpZiAodG9rZW4gIT09IGN1cnJlbnRfdG9rZW4pXHJcbiAgICAgICAgcmV0dXJuOyAvLyBhIHNlY29uZGFyeSBuYXZpZ2F0aW9uIGhhcHBlbmVkIHdoaWxlIHdlIHdlcmUgbG9hZGluZ1xyXG4gICAgaWYgKHJlZGlyZWN0KSB7XHJcbiAgICAgICAgeWllbGQgZ290byhyZWRpcmVjdC5sb2NhdGlvbiwgeyByZXBsYWNlU3RhdGU6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB5aWVsZCByZW5kZXIoYnJhbmNoLCBwcm9wcywgYnVpbGRQYWdlQ29udGV4dChwcm9wcywgZGVzdC5wYWdlKSk7XHJcbiAgICB9XHJcbn0pKTtcclxubGV0IHRhcmdldDtcclxuZnVuY3Rpb24gc2V0X3RhcmdldChub2RlKSB7XHJcbiAgICB0YXJnZXQgPSBub2RlO1xyXG59XHJcbmZ1bmN0aW9uIHN0YXJ0JDEob3B0cykge1xyXG4gICAgc2V0X3RhcmdldChvcHRzLnRhcmdldCk7XHJcbiAgICBpbml0KGluaXRpYWxfZGF0YS5iYXNlVXJsLCBoYW5kbGVfdGFyZ2V0JDEpO1xyXG4gICAgc3RhcnQoKTtcclxuICAgIGlmIChpbml0aWFsX2RhdGEuZXJyb3IpIHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBoYW5kbGVfZXJyb3IoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBsb2FkX2N1cnJlbnRfcGFnZSgpO1xyXG59XHJcbmZ1bmN0aW9uIGhhbmRsZV9lcnJvcigpIHtcclxuICAgIGNvbnN0IHsgaG9zdCwgcGF0aG5hbWUsIHNlYXJjaCB9ID0gbG9jYXRpb247XHJcbiAgICBjb25zdCB7IHNlc3Npb24sIHByZWxvYWRlZCwgc3RhdHVzLCBlcnJvciB9ID0gaW5pdGlhbF9kYXRhO1xyXG4gICAgaWYgKCFyb290X3ByZWxvYWRlZCkge1xyXG4gICAgICAgIHJvb3RfcHJlbG9hZGVkID0gcHJlbG9hZGVkICYmIHByZWxvYWRlZFswXTtcclxuICAgIH1cclxuICAgIGNvbnN0IHByb3BzID0ge1xyXG4gICAgICAgIGVycm9yLFxyXG4gICAgICAgIHN0YXR1cyxcclxuICAgICAgICBzZXNzaW9uLFxyXG4gICAgICAgIGxldmVsMDoge1xyXG4gICAgICAgICAgICBwcm9wczogcm9vdF9wcmVsb2FkZWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxldmVsMToge1xyXG4gICAgICAgICAgICBwcm9wczoge1xyXG4gICAgICAgICAgICAgICAgc3RhdHVzLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcG9uZW50OiBFcnJvckNvbXBvbmVudFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2VnbWVudHM6IHByZWxvYWRlZFxyXG4gICAgfTtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gZXh0cmFjdF9xdWVyeShzZWFyY2gpO1xyXG4gICAgcmVuZGVyKFtdLCBwcm9wcywgeyBob3N0LCBwYXRoOiBwYXRobmFtZSwgcXVlcnksIHBhcmFtczoge30sIGVycm9yIH0pO1xyXG59XHJcbmZ1bmN0aW9uIGJ1aWxkUGFnZUNvbnRleHQocHJvcHMsIHBhZ2UpIHtcclxuICAgIGNvbnN0IHsgZXJyb3IgfSA9IHByb3BzO1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBlcnJvciB9LCBwYWdlKTtcclxufVxyXG5mdW5jdGlvbiBoYW5kbGVfdGFyZ2V0JDEoZGVzdCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBpZiAocm9vdF9jb21wb25lbnQpXHJcbiAgICAgICAgICAgIHN0b3Jlcy5wcmVsb2FkaW5nLnNldCh0cnVlKTtcclxuICAgICAgICBjb25zdCBoeWRyYXRpbmcgPSBnZXRfcHJlZmV0Y2hlZChkZXN0KTtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGN1cnJlbnRfdG9rZW4gPSB7fTtcclxuICAgICAgICBjb25zdCBoeWRyYXRlZF90YXJnZXQgPSB5aWVsZCBoeWRyYXRpbmc7XHJcbiAgICAgICAgY29uc3QgeyByZWRpcmVjdCB9ID0gaHlkcmF0ZWRfdGFyZ2V0O1xyXG4gICAgICAgIGlmICh0b2tlbiAhPT0gY3VycmVudF90b2tlbilcclxuICAgICAgICAgICAgcmV0dXJuOyAvLyBhIHNlY29uZGFyeSBuYXZpZ2F0aW9uIGhhcHBlbmVkIHdoaWxlIHdlIHdlcmUgbG9hZGluZ1xyXG4gICAgICAgIGlmIChyZWRpcmVjdCkge1xyXG4gICAgICAgICAgICB5aWVsZCBnb3RvKHJlZGlyZWN0LmxvY2F0aW9uLCB7IHJlcGxhY2VTdGF0ZTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHsgcHJvcHMsIGJyYW5jaCB9ID0gaHlkcmF0ZWRfdGFyZ2V0O1xyXG4gICAgICAgICAgICB5aWVsZCByZW5kZXIoYnJhbmNoLCBwcm9wcywgYnVpbGRQYWdlQ29udGV4dChwcm9wcywgZGVzdC5wYWdlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gcmVuZGVyKGJyYW5jaCwgcHJvcHMsIHBhZ2UpIHtcclxuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgc3RvcmVzLnBhZ2Uuc2V0KHBhZ2UpO1xyXG4gICAgICAgIHN0b3Jlcy5wcmVsb2FkaW5nLnNldChmYWxzZSk7XHJcbiAgICAgICAgaWYgKHJvb3RfY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIHJvb3RfY29tcG9uZW50LiRzZXQocHJvcHMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcHJvcHMuc3RvcmVzID0ge1xyXG4gICAgICAgICAgICAgICAgcGFnZTogeyBzdWJzY3JpYmU6IHN0b3Jlcy5wYWdlLnN1YnNjcmliZSB9LFxyXG4gICAgICAgICAgICAgICAgcHJlbG9hZGluZzogeyBzdWJzY3JpYmU6IHN0b3Jlcy5wcmVsb2FkaW5nLnN1YnNjcmliZSB9LFxyXG4gICAgICAgICAgICAgICAgc2Vzc2lvbjogc3RvcmVzLnNlc3Npb25cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcHJvcHMubGV2ZWwwID0ge1xyXG4gICAgICAgICAgICAgICAgcHJvcHM6IHlpZWxkIHJvb3RfcHJlbG9hZGVkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHByb3BzLm5vdGlmeSA9IHN0b3Jlcy5wYWdlLm5vdGlmeTtcclxuICAgICAgICAgICAgcm9vdF9jb21wb25lbnQgPSBuZXcgQXBwKHtcclxuICAgICAgICAgICAgICAgIHRhcmdldCxcclxuICAgICAgICAgICAgICAgIHByb3BzLFxyXG4gICAgICAgICAgICAgICAgaHlkcmF0ZTogdHJ1ZVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY3VycmVudF9icmFuY2ggPSBicmFuY2g7XHJcbiAgICAgICAgY3VycmVudF9xdWVyeSA9IEpTT04uc3RyaW5naWZ5KHBhZ2UucXVlcnkpO1xyXG4gICAgICAgIHJlYWR5ID0gdHJ1ZTtcclxuICAgICAgICBzZXNzaW9uX2RpcnR5ID0gZmFsc2U7XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBwYXJ0X2NoYW5nZWQoaSwgc2VnbWVudCwgbWF0Y2gsIHN0cmluZ2lmaWVkX3F1ZXJ5KSB7XHJcbiAgICAvLyBUT0RPIG9ubHkgY2hlY2sgcXVlcnkgc3RyaW5nIGNoYW5nZXMgZm9yIHByZWxvYWQgZnVuY3Rpb25zXHJcbiAgICAvLyB0aGF0IGRvIGluIGZhY3QgZGVwZW5kIG9uIGl0ICh1c2luZyBzdGF0aWMgYW5hbHlzaXMgb3JcclxuICAgIC8vIHJ1bnRpbWUgaW5zdHJ1bWVudGF0aW9uKVxyXG4gICAgaWYgKHN0cmluZ2lmaWVkX3F1ZXJ5ICE9PSBjdXJyZW50X3F1ZXJ5KVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgY29uc3QgcHJldmlvdXMgPSBjdXJyZW50X2JyYW5jaFtpXTtcclxuICAgIGlmICghcHJldmlvdXMpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKHNlZ21lbnQgIT09IHByZXZpb3VzLnNlZ21lbnQpXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAocHJldmlvdXMubWF0Y2gpIHtcclxuICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkocHJldmlvdXMubWF0Y2guc2xpY2UoMSwgaSArIDIpKSAhPT0gSlNPTi5zdHJpbmdpZnkobWF0Y2guc2xpY2UoMSwgaSArIDIpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaHlkcmF0ZV90YXJnZXQoZGVzdCkge1xyXG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICBjb25zdCB7IHJvdXRlLCBwYWdlIH0gPSBkZXN0O1xyXG4gICAgICAgIGNvbnN0IHNlZ21lbnRzID0gcGFnZS5wYXRoLnNwbGl0KCcvJykuZmlsdGVyKEJvb2xlYW4pO1xyXG4gICAgICAgIGxldCByZWRpcmVjdCA9IG51bGw7XHJcbiAgICAgICAgY29uc3QgcHJvcHMgPSB7IGVycm9yOiBudWxsLCBzdGF0dXM6IDIwMCwgc2VnbWVudHM6IFtzZWdtZW50c1swXV0gfTtcclxuICAgICAgICBjb25zdCBwcmVsb2FkX2NvbnRleHQgPSB7XHJcbiAgICAgICAgICAgIGZldGNoOiAodXJsLCBvcHRzKSA9PiBmZXRjaCh1cmwsIG9wdHMpLFxyXG4gICAgICAgICAgICByZWRpcmVjdDogKHN0YXR1c0NvZGUsIGxvY2F0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3QgJiYgKHJlZGlyZWN0LnN0YXR1c0NvZGUgIT09IHN0YXR1c0NvZGUgfHwgcmVkaXJlY3QubG9jYXRpb24gIT09IGxvY2F0aW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uZmxpY3RpbmcgcmVkaXJlY3RzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZWRpcmVjdCA9IHsgc3RhdHVzQ29kZSwgbG9jYXRpb24gfTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IChzdGF0dXMsIGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwcm9wcy5lcnJvciA9IHR5cGVvZiBlcnJvciA9PT0gJ3N0cmluZycgPyBuZXcgRXJyb3IoZXJyb3IpIDogZXJyb3I7XHJcbiAgICAgICAgICAgICAgICBwcm9wcy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghcm9vdF9wcmVsb2FkZWQpIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9vdF9wcmVsb2FkID0gcm9vdF9jb21wLnByZWxvYWQgfHwgKCgpID0+ICh7fSkpO1xyXG4gICAgICAgICAgICByb290X3ByZWxvYWRlZCA9IGluaXRpYWxfZGF0YS5wcmVsb2FkZWRbMF0gfHwgcm9vdF9wcmVsb2FkLmNhbGwocHJlbG9hZF9jb250ZXh0LCB7XHJcbiAgICAgICAgICAgICAgICBob3N0OiBwYWdlLmhvc3QsXHJcbiAgICAgICAgICAgICAgICBwYXRoOiBwYWdlLnBhdGgsXHJcbiAgICAgICAgICAgICAgICBxdWVyeTogcGFnZS5xdWVyeSxcclxuICAgICAgICAgICAgICAgIHBhcmFtczoge31cclxuICAgICAgICAgICAgfSwgJHNlc3Npb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYnJhbmNoO1xyXG4gICAgICAgIGxldCBsID0gMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBzdHJpbmdpZmllZF9xdWVyeSA9IEpTT04uc3RyaW5naWZ5KHBhZ2UucXVlcnkpO1xyXG4gICAgICAgICAgICBjb25zdCBtYXRjaCA9IHJvdXRlLnBhdHRlcm4uZXhlYyhwYWdlLnBhdGgpO1xyXG4gICAgICAgICAgICBsZXQgc2VnbWVudF9kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBicmFuY2ggPSB5aWVsZCBQcm9taXNlLmFsbChyb3V0ZS5wYXJ0cy5tYXAoKHBhcnQsIGkpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSBzZWdtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJ0X2NoYW5nZWQoaSwgc2VnbWVudCwgbWF0Y2gsIHN0cmluZ2lmaWVkX3F1ZXJ5KSlcclxuICAgICAgICAgICAgICAgICAgICBzZWdtZW50X2RpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHByb3BzLnNlZ21lbnRzW2xdID0gc2VnbWVudHNbaSArIDFdOyAvLyBUT0RPIG1ha2UgdGhpcyBsZXNzIGNvbmZ1c2luZ1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwYXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7IHNlZ21lbnQgfTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGogPSBsKys7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlc3Npb25fZGlydHkgJiYgIXNlZ21lbnRfZGlydHkgJiYgY3VycmVudF9icmFuY2hbaV0gJiYgY3VycmVudF9icmFuY2hbaV0ucGFydCA9PT0gcGFydC5pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRfYnJhbmNoW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc2VnbWVudF9kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyBkZWZhdWx0OiBjb21wb25lbnQsIHByZWxvYWQgfSA9IHlpZWxkIGNvbXBvbmVudHNbcGFydC5pXS5qcygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHByZWxvYWRlZDtcclxuICAgICAgICAgICAgICAgIGlmIChyZWFkeSB8fCAhaW5pdGlhbF9kYXRhLnByZWxvYWRlZFtpICsgMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZWQgPSBwcmVsb2FkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8geWllbGQgcHJlbG9hZC5jYWxsKHByZWxvYWRfY29udGV4dCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9zdDogcGFnZS5ob3N0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogcGFnZS5wYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHBhZ2UucXVlcnksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHBhcnQucGFyYW1zID8gcGFydC5wYXJhbXMoZGVzdC5tYXRjaCkgOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAkc2Vzc2lvbilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiB7fTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRlZCA9IGluaXRpYWxfZGF0YS5wcmVsb2FkZWRbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChwcm9wc1tgbGV2ZWwke2p9YF0gPSB7IGNvbXBvbmVudCwgcHJvcHM6IHByZWxvYWRlZCwgc2VnbWVudCwgbWF0Y2gsIHBhcnQ6IHBhcnQuaSB9KTtcclxuICAgICAgICAgICAgfSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHByb3BzLmVycm9yID0gZXJyb3I7XHJcbiAgICAgICAgICAgIHByb3BzLnN0YXR1cyA9IDUwMDtcclxuICAgICAgICAgICAgYnJhbmNoID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHJlZGlyZWN0LCBwcm9wcywgYnJhbmNoIH07XHJcbiAgICB9KTtcclxufVxuXG5mdW5jdGlvbiBwcmVmZXRjaFJvdXRlcyhwYXRobmFtZXMpIHtcclxuICAgIHJldHVybiByb3V0ZXNcclxuICAgICAgICAuZmlsdGVyKHBhdGhuYW1lc1xyXG4gICAgICAgID8gcm91dGUgPT4gcGF0aG5hbWVzLnNvbWUocGF0aG5hbWUgPT4gcm91dGUucGF0dGVybi50ZXN0KHBhdGhuYW1lKSlcclxuICAgICAgICA6ICgpID0+IHRydWUpXHJcbiAgICAgICAgLnJlZHVjZSgocHJvbWlzZSwgcm91dGUpID0+IHByb21pc2UudGhlbigoKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHJvdXRlLnBhcnRzLm1hcChwYXJ0ID0+IHBhcnQgJiYgY29tcG9uZW50c1twYXJ0LmldLmpzKCkpKTtcclxuICAgIH0pLCBQcm9taXNlLnJlc29sdmUoKSk7XHJcbn1cblxuY29uc3Qgc3RvcmVzJDEgPSAoKSA9PiBnZXRDb250ZXh0KENPTlRFWFRfS0VZKTtcblxuZXhwb3J0IHsgZ290bywgcHJlZmV0Y2gsIHByZWZldGNoUm91dGVzLCBzdGFydCQxIGFzIHN0YXJ0LCBzdG9yZXMkMSBhcyBzdG9yZXMgfTtcbiIsIihmdW5jdGlvbiAoT2JqZWN0KSB7XG4gIHR5cGVvZiBnbG9iYWxUaGlzICE9PSAnb2JqZWN0JyAmJiAoXG4gICAgdGhpcyA/XG4gICAgICBnZXQoKSA6XG4gICAgICAoT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsICdfVF8nLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgZ2V0OiBnZXRcbiAgICAgIH0pLCBfVF8pXG4gICk7XG4gIGZ1bmN0aW9uIGdldCgpIHtcbiAgICB2YXIgZ2xvYmFsID0gdGhpcyB8fCBzZWxmO1xuICAgIGdsb2JhbC5nbG9iYWxUaGlzID0gZ2xvYmFsO1xuICAgIGRlbGV0ZSBPYmplY3QucHJvdG90eXBlLl9UXztcbiAgfVxufShPYmplY3QpKTtcbmV4cG9ydCBkZWZhdWx0IGdsb2JhbFRoaXM7XG4iLG51bGxdLCJuYW1lcyI6WyJpbml0IiwiRXJyb3JDb21wb25lbnQiLCJyb290X2NvbXAucHJlbG9hZCIsInNhcHBlci5zdGFydCJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTLElBQUksR0FBRyxHQUFHO0FBQ2QsTUFBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDeEIsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMxQjtBQUNBLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxHQUFHO0FBQ3ZCLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUlELFNBQVMsWUFBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7QUFDekQsSUFBSSxPQUFPLENBQUMsYUFBYSxHQUFHO0FBQzVCLFFBQVEsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQ3pDLEtBQUssQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLEdBQUcsQ0FBQyxFQUFFLEVBQUU7QUFDakIsSUFBSSxPQUFPLEVBQUUsRUFBRSxDQUFDO0FBQ2hCLENBQUM7QUFDRCxTQUFTLFlBQVksR0FBRztBQUN4QixJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBQ0QsU0FBUyxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQ3RCLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixDQUFDO0FBQ0QsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQzVCLElBQUksT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUM7QUFDdkMsQ0FBQztBQUNELFNBQVMsY0FBYyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDOUIsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsS0FBSyxPQUFPLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQztBQUNsRyxDQUFDO0FBSUQsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0FBQ3ZCLElBQUksT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUNELFNBQVMsY0FBYyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7QUFDckMsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksT0FBTyxLQUFLLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtBQUNoRSxRQUFRLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLDBDQUEwQyxDQUFDLENBQUMsQ0FBQztBQUM5RSxLQUFLO0FBQ0wsQ0FBQztBQUNELFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxHQUFHLFNBQVMsRUFBRTtBQUN4QyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtBQUN2QixRQUFRLE9BQU8sSUFBSSxDQUFDO0FBQ3BCLEtBQUs7QUFDTCxJQUFJLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztBQUNoRCxJQUFJLE9BQU8sS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLEtBQUssQ0FBQyxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUM7QUFDakUsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLEtBQUssRUFBRTtBQUNoQyxJQUFJLElBQUksS0FBSyxDQUFDO0FBQ2QsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUN2QyxJQUFJLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxTQUFTLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ3pELElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBQ0QsU0FBUyxXQUFXLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFO0FBQ25ELElBQUksSUFBSSxVQUFVLEVBQUU7QUFDcEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4RSxRQUFRLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUU7QUFDeEQsSUFBSSxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQzlCLFVBQVUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzdELFVBQVUsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUN0QixDQUFDO0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7QUFDMUQsSUFBSSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDN0IsUUFBUSxNQUFNLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQ3pDLFlBQVksT0FBTyxJQUFJLENBQUM7QUFDeEIsU0FBUztBQUNULFFBQVEsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDdEMsWUFBWSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDOUIsWUFBWSxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwRSxZQUFZLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3QyxnQkFBZ0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELGFBQWE7QUFDYixZQUFZLE9BQU8sTUFBTSxDQUFDO0FBQzFCLFNBQVM7QUFDVCxRQUFRLE9BQU8sT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDcEMsS0FBSztBQUNMLElBQUksT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQ3pCLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFLG1CQUFtQixFQUFFO0FBQzNHLElBQUksTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNoRyxJQUFJLElBQUksWUFBWSxFQUFFO0FBQ3RCLFFBQVEsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNsRyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzNDLEtBQUs7QUFDTCxDQUFDO0FBUUQsU0FBUyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUU7QUFDdkMsSUFBSSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEtBQUs7QUFDekIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHO0FBQ3hCLFlBQVksTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxJQUFJLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUE0QkQsU0FBUyxlQUFlLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsR0FBRyxFQUFFO0FBQ2xELElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixJQUFJLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFO0FBQ3pDLElBQUksT0FBTyxhQUFhLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxhQUFhLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUM5RixDQUFDO0FBQ0Q7QUFDQSxNQUFNLFNBQVMsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUM7QUFDaEQsSUFBSSxHQUFHLEdBQUcsU0FBUztBQUNuQixNQUFNLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDcEMsTUFBTSxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QixJQUFJLEdBQUcsR0FBRyxTQUFTLEdBQUcsRUFBRSxJQUFJLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztBQVE3RDtBQUNBLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7QUFDeEIsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3hCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUk7QUFDMUIsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUMxQixZQUFZLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsWUFBWSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDckIsU0FBUztBQUNULEtBQUssQ0FBQyxDQUFDO0FBQ1AsSUFBSSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQztBQUN4QixRQUFRLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN2QixDQUFDO0FBT0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDeEIsSUFBSSxJQUFJLElBQUksQ0FBQztBQUNiLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUM7QUFDeEIsUUFBUSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDdkIsSUFBSSxPQUFPO0FBQ1gsUUFBUSxPQUFPLEVBQUUsSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJO0FBQ3hDLFlBQVksS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQzFELFNBQVMsQ0FBQztBQUNWLFFBQVEsS0FBSyxHQUFHO0FBQ2hCLFlBQVksS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNEO0FBQ0EsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUM5QixJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO0FBQ3RDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFDRCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDdEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBQ0QsU0FBUyxZQUFZLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRTtBQUM3QyxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkQsUUFBUSxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDekIsWUFBWSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZDLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQ3ZCLElBQUksT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFnQkQsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQzNCLElBQUksT0FBTyxRQUFRLENBQUMsZUFBZSxDQUFDLDRCQUE0QixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hFLENBQUM7QUFDRCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7QUFDcEIsSUFBSSxPQUFPLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUNELFNBQVMsS0FBSyxHQUFHO0FBQ2pCLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsQ0FBQztBQUNELFNBQVMsS0FBSyxHQUFHO0FBQ2pCLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTtBQUMvQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELElBQUksT0FBTyxNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFDRCxTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUU7QUFDN0IsSUFBSSxPQUFPLFVBQVUsS0FBSyxFQUFFO0FBQzVCLFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9CO0FBQ0EsUUFBUSxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLEtBQUssQ0FBQztBQUNOLENBQUM7QUFlRCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRTtBQUN0QyxJQUFJLElBQUksS0FBSyxJQUFJLElBQUk7QUFDckIsUUFBUSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLFNBQVMsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUs7QUFDbkQsUUFBUSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM1QyxDQUFDO0FBQ0QsU0FBUyxjQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRTtBQUMxQztBQUNBLElBQUksTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLHlCQUF5QixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6RSxJQUFJLEtBQUssTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFO0FBQ2xDLFFBQVEsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFO0FBQ3JDLFlBQVksSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QyxTQUFTO0FBQ1QsYUFBYSxJQUFJLEdBQUcsS0FBSyxPQUFPLEVBQUU7QUFDbEMsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsU0FBUztBQUNULGFBQWEsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO0FBQ3BDLFlBQVksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JELFNBQVM7QUFDVCxhQUFhLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUU7QUFDM0QsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFNBQVM7QUFDVCxhQUFhO0FBQ2IsWUFBWSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUM3QyxTQUFTO0FBQ1QsS0FBSztBQUNMLENBQUM7QUFzQ0QsU0FBUyxRQUFRLENBQUMsT0FBTyxFQUFFO0FBQzNCLElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBQ0QsU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFO0FBQ3JELElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM5QyxRQUFRLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7QUFDcEMsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsWUFBWSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDOUIsWUFBWSxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtBQUMvQyxnQkFBZ0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZELGdCQUFnQixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNqRCxvQkFBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixZQUFZLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BELGdCQUFnQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hELGFBQWE7QUFDYixZQUFZLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLE9BQU8sR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7QUFDakMsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzlDLFFBQVEsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlCLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtBQUNqQyxZQUFZLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztBQUNsQyxZQUFZLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDNUIsSUFBSSxPQUFPLFVBQVUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbEMsQ0FBQztBQU1ELFNBQVMsZUFBZSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDdkMsSUFBSSxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztBQUM3QyxDQUFDO0FBU0QsU0FBUyxTQUFTLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO0FBQ2hELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxTQUFTLEdBQUcsV0FBVyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7QUE2RUQsU0FBUyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDN0MsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkQsQ0FBQztBQUNELFNBQVMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDcEMsSUFBSSxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xELElBQUksQ0FBQyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRCxJQUFJLE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQUNELFNBQVMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQzlELElBQUksT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFDRCxNQUFNLE9BQU8sQ0FBQztBQUNkLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUU7QUFDL0IsUUFBUSxJQUFJLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUN4QixRQUFRLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDL0IsS0FBSztBQUNMLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxHQUFHLElBQUksRUFBRTtBQUNuQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3JCLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLFlBQVksSUFBSSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDNUIsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLFNBQVM7QUFDVCxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkIsS0FBSztBQUNMLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRTtBQUNaLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ2hDLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDL0MsS0FBSztBQUNMLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUNkLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkQsWUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzlDLFNBQVM7QUFDVCxLQUFLO0FBQ0wsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO0FBQ1osUUFBUSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDakIsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JCLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsS0FBSztBQUNMLElBQUksQ0FBQyxHQUFHO0FBQ1IsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixLQUFLO0FBQ0wsQ0FBQztBQWVEO0FBQ0EsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUM5QixJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZjtBQUNBLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNuQixJQUFJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNwQixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDdkIsSUFBSSxPQUFPLENBQUMsRUFBRTtBQUNkLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELElBQUksT0FBTyxJQUFJLEtBQUssQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRCxTQUFTLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsRUFBRTtBQUNyRSxJQUFJLE1BQU0sSUFBSSxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUM7QUFDbkMsSUFBSSxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDMUIsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDdkMsUUFBUSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4QyxRQUFRLFNBQVMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RELEtBQUs7QUFDTCxJQUFJLE1BQU0sSUFBSSxHQUFHLFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6RCxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNqRCxJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7QUFDbkMsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCLElBQUksTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLG1CQUFtQixLQUFLLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzSCxJQUFJLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxjQUFjLEtBQUssR0FBRyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUMxRSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDOUIsUUFBUSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQ25DLFFBQVEsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4RixLQUFLO0FBQ0wsSUFBSSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxFQUFFLENBQUM7QUFDakQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoSCxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUM7QUFDaEIsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0QsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUNqQyxJQUFJLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5RCxJQUFJLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSTtBQUNyQyxVQUFVLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDeEMsVUFBVSxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakQsS0FBSyxDQUFDO0FBQ04sSUFBSSxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDbEQsSUFBSSxJQUFJLE9BQU8sRUFBRTtBQUNqQixRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0MsUUFBUSxNQUFNLElBQUksT0FBTyxDQUFDO0FBQzFCLFFBQVEsSUFBSSxDQUFDLE1BQU07QUFDbkIsWUFBWSxXQUFXLEVBQUUsQ0FBQztBQUMxQixLQUFLO0FBQ0wsQ0FBQztBQUNELFNBQVMsV0FBVyxHQUFHO0FBQ3ZCLElBQUksR0FBRyxDQUFDLE1BQU07QUFDZCxRQUFRLElBQUksTUFBTTtBQUNsQixZQUFZLE9BQU87QUFDbkIsUUFBUSxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSTtBQUNuQyxZQUFZLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztBQUN2RCxZQUFZLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO0FBQy9DLFlBQVksT0FBTyxDQUFDLEVBQUU7QUFDdEIsZ0JBQWdCLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekMsWUFBWSxHQUFHLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUNwQyxTQUFTLENBQUMsQ0FBQztBQUNYLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzVCLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXNFRDtBQUNHLElBQUMsa0JBQWtCO0FBQ3RCLFNBQVMscUJBQXFCLENBQUMsU0FBUyxFQUFFO0FBQzFDLElBQUksaUJBQWlCLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLENBQUM7QUFDRCxTQUFTLHFCQUFxQixHQUFHO0FBQ2pDLElBQUksSUFBSSxDQUFDLGlCQUFpQjtBQUMxQixRQUFRLE1BQU0sSUFBSSxLQUFLLENBQUMsa0RBQWtELENBQUMsQ0FBQztBQUM1RSxJQUFJLE9BQU8saUJBQWlCLENBQUM7QUFDN0IsQ0FBQztBQUlELFNBQVMsT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUNyQixJQUFJLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUNELFNBQVMsV0FBVyxDQUFDLEVBQUUsRUFBRTtBQUN6QixJQUFJLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckQsQ0FBQztBQUNELFNBQVMsU0FBUyxDQUFDLEVBQUUsRUFBRTtBQUN2QixJQUFJLHFCQUFxQixFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkQsQ0FBQztBQUNELFNBQVMscUJBQXFCLEdBQUc7QUFDakMsSUFBSSxNQUFNLFNBQVMsR0FBRyxxQkFBcUIsRUFBRSxDQUFDO0FBQzlDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLEtBQUs7QUFDN0IsUUFBUSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2RCxRQUFRLElBQUksU0FBUyxFQUFFO0FBQ3ZCO0FBQ0E7QUFDQSxZQUFZLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckQsWUFBWSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUM1QyxnQkFBZ0IsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUMsYUFBYSxDQUFDLENBQUM7QUFDZixTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDbEMsSUFBSSxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ3pCLElBQUksT0FBTyxxQkFBcUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZELENBQUM7QUFJRDtBQUNBO0FBQ0E7QUFDQSxTQUFTLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFO0FBQ2xDLElBQUksTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pELElBQUksSUFBSSxTQUFTLEVBQUU7QUFDbkIsUUFBUSxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNuRCxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFFdkIsTUFBQyxpQkFBaUIsR0FBRyxHQUFHO0FBQzdCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztBQUMzQixNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMzQyxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUM3QixTQUFTLGVBQWUsR0FBRztBQUMzQixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUMzQixRQUFRLGdCQUFnQixHQUFHLElBQUksQ0FBQztBQUNoQyxRQUFRLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxLQUFLO0FBQ0wsQ0FBQztBQUNELFNBQVMsSUFBSSxHQUFHO0FBQ2hCLElBQUksZUFBZSxFQUFFLENBQUM7QUFDdEIsSUFBSSxPQUFPLGdCQUFnQixDQUFDO0FBQzVCLENBQUM7QUFDRCxTQUFTLG1CQUFtQixDQUFDLEVBQUUsRUFBRTtBQUNqQyxJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBQ0QsU0FBUyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7QUFDaEMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdCLENBQUM7QUFDRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDckIsTUFBTSxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNqQyxTQUFTLEtBQUssR0FBRztBQUNqQixJQUFJLElBQUksUUFBUTtBQUNoQixRQUFRLE9BQU87QUFDZixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsSUFBSSxHQUFHO0FBQ1A7QUFDQTtBQUNBLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQzdELFlBQVksTUFBTSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEQsWUFBWSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QyxZQUFZLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDakMsU0FBUztBQUNULFFBQVEscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsUUFBUSxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ3BDLFFBQVEsT0FBTyxpQkFBaUIsQ0FBQyxNQUFNO0FBQ3ZDLFlBQVksaUJBQWlCLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztBQUN0QztBQUNBO0FBQ0E7QUFDQSxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUM3RCxZQUFZLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pELFlBQVksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDL0M7QUFDQSxnQkFBZ0IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QyxnQkFBZ0IsUUFBUSxFQUFFLENBQUM7QUFDM0IsYUFBYTtBQUNiLFNBQVM7QUFDVCxRQUFRLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDcEMsS0FBSyxRQUFRLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtBQUN0QyxJQUFJLE9BQU8sZUFBZSxDQUFDLE1BQU0sRUFBRTtBQUNuQyxRQUFRLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO0FBQ2hDLEtBQUs7QUFDTCxJQUFJLGdCQUFnQixHQUFHLEtBQUssQ0FBQztBQUM3QixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDckIsSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQUNELFNBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRTtBQUNwQixJQUFJLElBQUksRUFBRSxDQUFDLFFBQVEsS0FBSyxJQUFJLEVBQUU7QUFDOUIsUUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDcEIsUUFBUSxPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xDLFFBQVEsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztBQUMvQixRQUFRLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLFFBQVEsRUFBRSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFFBQVEsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNyRCxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0EsSUFBSSxPQUFPLENBQUM7QUFDWixTQUFTLElBQUksR0FBRztBQUNoQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDbEIsUUFBUSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3BDLFFBQVEsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNO0FBQzNCLFlBQVksT0FBTyxHQUFHLElBQUksQ0FBQztBQUMzQixTQUFTLENBQUMsQ0FBQztBQUNYLEtBQUs7QUFDTCxJQUFJLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFDRCxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRTtBQUN6QyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxTQUFTLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hGLENBQUM7QUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQUksTUFBTSxDQUFDO0FBQ1gsU0FBUyxZQUFZLEdBQUc7QUFDeEIsSUFBSSxNQUFNLEdBQUc7QUFDYixRQUFRLENBQUMsRUFBRSxDQUFDO0FBQ1osUUFBUSxDQUFDLEVBQUUsRUFBRTtBQUNiLFFBQVEsQ0FBQyxFQUFFLE1BQU07QUFDakIsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsWUFBWSxHQUFHO0FBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUU7QUFDbkIsUUFBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLEtBQUs7QUFDTCxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFDRCxTQUFTLGFBQWEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ3JDLElBQUksSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxQixRQUFRLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDL0IsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxjQUFjLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQ3hELElBQUksSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxQixRQUFRLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDL0IsWUFBWSxPQUFPO0FBQ25CLFFBQVEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QixRQUFRLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDNUIsWUFBWSxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLFlBQVksSUFBSSxRQUFRLEVBQUU7QUFDMUIsZ0JBQWdCLElBQUksTUFBTTtBQUMxQixvQkFBb0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQixnQkFBZ0IsUUFBUSxFQUFFLENBQUM7QUFDM0IsYUFBYTtBQUNiLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsTUFBTSxlQUFlLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDeEMsU0FBUyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUNoRCxJQUFJLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDbEMsSUFBSSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDeEIsSUFBSSxJQUFJLGNBQWMsQ0FBQztBQUN2QixJQUFJLElBQUksSUFBSSxDQUFDO0FBQ2IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDaEIsSUFBSSxTQUFTLE9BQU8sR0FBRztBQUN2QixRQUFRLElBQUksY0FBYztBQUMxQixZQUFZLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDOUMsS0FBSztBQUNMLElBQUksU0FBUyxFQUFFLEdBQUc7QUFDbEIsUUFBUSxNQUFNLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxRQUFRLEdBQUcsR0FBRyxFQUFFLE1BQU0sR0FBRyxRQUFRLEVBQUUsSUFBSSxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxNQUFNLElBQUksZUFBZSxDQUFDO0FBQzdHLFFBQVEsSUFBSSxHQUFHO0FBQ2YsWUFBWSxjQUFjLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQzFGLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuQixRQUFRLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztBQUN6QyxRQUFRLE1BQU0sUUFBUSxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDL0MsUUFBUSxJQUFJLElBQUk7QUFDaEIsWUFBWSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDekIsUUFBUSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFFBQVEsbUJBQW1CLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUk7QUFDM0IsWUFBWSxJQUFJLE9BQU8sRUFBRTtBQUN6QixnQkFBZ0IsSUFBSSxHQUFHLElBQUksUUFBUSxFQUFFO0FBQ3JDLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLG9CQUFvQixRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoRCxvQkFBb0IsT0FBTyxFQUFFLENBQUM7QUFDOUIsb0JBQW9CLE9BQU8sT0FBTyxHQUFHLEtBQUssQ0FBQztBQUMzQyxpQkFBaUI7QUFDakIsZ0JBQWdCLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtBQUN2QyxvQkFBb0IsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHLFVBQVUsSUFBSSxRQUFRLENBQUMsQ0FBQztBQUNwRSxvQkFBb0IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbkMsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixZQUFZLE9BQU8sT0FBTyxDQUFDO0FBQzNCLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsS0FBSztBQUNMLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3hCLElBQUksT0FBTztBQUNYLFFBQVEsS0FBSyxHQUFHO0FBQ2hCLFlBQVksSUFBSSxPQUFPO0FBQ3ZCLGdCQUFnQixPQUFPO0FBQ3ZCLFlBQVksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLFlBQVksSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDckMsZ0JBQWdCLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUNsQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO0FBQ3JCLGFBQWE7QUFDYixTQUFTO0FBQ1QsUUFBUSxVQUFVLEdBQUc7QUFDckIsWUFBWSxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFNBQVM7QUFDVCxRQUFRLEdBQUcsR0FBRztBQUNkLFlBQVksSUFBSSxPQUFPLEVBQUU7QUFDekIsZ0JBQWdCLE9BQU8sRUFBRSxDQUFDO0FBQzFCLGdCQUFnQixPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ2hDLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMscUJBQXFCLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUU7QUFDakQsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLElBQUksSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLElBQUksSUFBSSxjQUFjLENBQUM7QUFDdkIsSUFBSSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDekIsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixJQUFJLFNBQVMsRUFBRSxHQUFHO0FBQ2xCLFFBQVEsTUFBTSxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsUUFBUSxHQUFHLEdBQUcsRUFBRSxNQUFNLEdBQUcsUUFBUSxFQUFFLElBQUksR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxJQUFJLGVBQWUsQ0FBQztBQUM3RyxRQUFRLElBQUksR0FBRztBQUNmLFlBQVksY0FBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuRixRQUFRLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztBQUN6QyxRQUFRLE1BQU0sUUFBUSxHQUFHLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDL0MsUUFBUSxtQkFBbUIsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7QUFDbEUsUUFBUSxJQUFJLENBQUMsR0FBRyxJQUFJO0FBQ3BCLFlBQVksSUFBSSxPQUFPLEVBQUU7QUFDekIsZ0JBQWdCLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtBQUNyQyxvQkFBb0IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixvQkFBb0IsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakQsb0JBQW9CLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDcEM7QUFDQTtBQUNBLHdCQUF3QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLHFCQUFxQjtBQUNyQixvQkFBb0IsT0FBTyxLQUFLLENBQUM7QUFDakMsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLEdBQUcsSUFBSSxVQUFVLEVBQUU7QUFDdkMsb0JBQW9CLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsR0FBRyxVQUFVLElBQUksUUFBUSxDQUFDLENBQUM7QUFDcEUsb0JBQW9CLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25DLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2IsWUFBWSxPQUFPLE9BQU8sQ0FBQztBQUMzQixTQUFTLENBQUMsQ0FBQztBQUNYLEtBQUs7QUFDTCxJQUFJLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzdCLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDMUI7QUFDQSxZQUFZLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUM5QixZQUFZLEVBQUUsRUFBRSxDQUFDO0FBQ2pCLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsS0FBSztBQUNMLFNBQVM7QUFDVCxRQUFRLEVBQUUsRUFBRSxDQUFDO0FBQ2IsS0FBSztBQUNMLElBQUksT0FBTztBQUNYLFFBQVEsR0FBRyxDQUFDLEtBQUssRUFBRTtBQUNuQixZQUFZLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDdEMsZ0JBQWdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLGFBQWE7QUFDYixZQUFZLElBQUksT0FBTyxFQUFFO0FBQ3pCLGdCQUFnQixJQUFJLGNBQWM7QUFDbEMsb0JBQW9CLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDdEQsZ0JBQWdCLE9BQU8sR0FBRyxLQUFLLENBQUM7QUFDaEMsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUywrQkFBK0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7QUFDbEUsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2xDLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsSUFBSSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDL0IsSUFBSSxJQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDL0IsSUFBSSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDOUIsSUFBSSxTQUFTLGVBQWUsR0FBRztBQUMvQixRQUFRLElBQUksY0FBYztBQUMxQixZQUFZLFdBQVcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDOUMsS0FBSztBQUNMLElBQUksU0FBUyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRTtBQUNyQyxRQUFRLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLFFBQVEsUUFBUSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEMsUUFBUSxPQUFPO0FBQ2YsWUFBWSxDQUFDLEVBQUUsQ0FBQztBQUNoQixZQUFZLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN4QixZQUFZLENBQUM7QUFDYixZQUFZLFFBQVE7QUFDcEIsWUFBWSxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7QUFDaEMsWUFBWSxHQUFHLEVBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxRQUFRO0FBQ3pDLFlBQVksS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLO0FBQ2hDLFNBQVMsQ0FBQztBQUNWLEtBQUs7QUFDTCxJQUFJLFNBQVMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNuQixRQUFRLE1BQU0sRUFBRSxLQUFLLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxHQUFHLEVBQUUsTUFBTSxHQUFHLFFBQVEsRUFBRSxJQUFJLEdBQUcsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLE1BQU0sSUFBSSxlQUFlLENBQUM7QUFDN0csUUFBUSxNQUFNLE9BQU8sR0FBRztBQUN4QixZQUFZLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLO0FBQ2hDLFlBQVksQ0FBQztBQUNiLFNBQVMsQ0FBQztBQUNWLFFBQVEsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUNoQjtBQUNBLFlBQVksT0FBTyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDbkMsWUFBWSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMxQixTQUFTO0FBQ1QsUUFBUSxJQUFJLGVBQWUsSUFBSSxlQUFlLEVBQUU7QUFDaEQsWUFBWSxlQUFlLEdBQUcsT0FBTyxDQUFDO0FBQ3RDLFNBQVM7QUFDVCxhQUFhO0FBQ2I7QUFDQTtBQUNBLFlBQVksSUFBSSxHQUFHLEVBQUU7QUFDckIsZ0JBQWdCLGVBQWUsRUFBRSxDQUFDO0FBQ2xDLGdCQUFnQixjQUFjLEdBQUcsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZGLGFBQWE7QUFDYixZQUFZLElBQUksQ0FBQztBQUNqQixnQkFBZ0IsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzQixZQUFZLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3RELFlBQVksbUJBQW1CLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLFlBQVksSUFBSSxDQUFDLEdBQUcsSUFBSTtBQUN4QixnQkFBZ0IsSUFBSSxlQUFlLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyxLQUFLLEVBQUU7QUFDcEUsb0JBQW9CLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3RFLG9CQUFvQixlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQzNDLG9CQUFvQixRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDL0Qsb0JBQW9CLElBQUksR0FBRyxFQUFFO0FBQzdCLHdCQUF3QixlQUFlLEVBQUUsQ0FBQztBQUMxQyx3QkFBd0IsY0FBYyxHQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsSSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLGVBQWUsRUFBRTtBQUNyQyxvQkFBb0IsSUFBSSxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsRUFBRTtBQUNwRCx3QkFBd0IsSUFBSSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMzRCx3QkFBd0IsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2pFLHdCQUF3QixJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzlDO0FBQ0EsNEJBQTRCLElBQUksZUFBZSxDQUFDLENBQUMsRUFBRTtBQUNuRDtBQUNBLGdDQUFnQyxlQUFlLEVBQUUsQ0FBQztBQUNsRCw2QkFBNkI7QUFDN0IsaUNBQWlDO0FBQ2pDO0FBQ0EsZ0NBQWdDLElBQUksQ0FBQyxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM5RCxvQ0FBb0MsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6Qix3QkFBd0IsZUFBZSxHQUFHLElBQUksQ0FBQztBQUMvQyxxQkFBcUI7QUFDckIseUJBQXlCLElBQUksR0FBRyxJQUFJLGVBQWUsQ0FBQyxLQUFLLEVBQUU7QUFDM0Qsd0JBQXdCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDO0FBQzlELHdCQUF3QixDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3pHLHdCQUF3QixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN2QyxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGdCQUFnQixPQUFPLENBQUMsRUFBRSxlQUFlLElBQUksZUFBZSxDQUFDLENBQUM7QUFDOUQsYUFBYSxDQUFDLENBQUM7QUFDZixTQUFTO0FBQ1QsS0FBSztBQUNMLElBQUksT0FBTztBQUNYLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNmLFlBQVksSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDckMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNO0FBQ2xDO0FBQ0Esb0JBQW9CLE1BQU0sR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUN0QyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFCLGlCQUFpQixDQUFDLENBQUM7QUFDbkIsYUFBYTtBQUNiLGlCQUFpQjtBQUNqQixnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLGFBQWE7QUFDYixTQUFTO0FBQ1QsUUFBUSxHQUFHLEdBQUc7QUFDZCxZQUFZLGVBQWUsRUFBRSxDQUFDO0FBQzlCLFlBQVksZUFBZSxHQUFHLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDckQsU0FBUztBQUNULEtBQUssQ0FBQztBQUNOLENBQUM7QUFzRUQ7QUFDSyxNQUFDLE9BQU8sSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXO0FBQzlDLE1BQU0sTUFBTTtBQUNaLE1BQU0sT0FBTyxVQUFVLEtBQUssV0FBVztBQUN2QyxVQUFVLFVBQVU7QUFDcEIsVUFBVSxNQUFNLEVBQUU7QUF3R2xCO0FBQ0EsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQzVDLElBQUksTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLElBQUksTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQzNCLElBQUksTUFBTSxhQUFhLEdBQUcsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7QUFDekMsSUFBSSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQzFCLElBQUksT0FBTyxDQUFDLEVBQUUsRUFBRTtBQUNoQixRQUFRLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QixRQUFRLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixRQUFRLElBQUksQ0FBQyxFQUFFO0FBQ2YsWUFBWSxLQUFLLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRTtBQUNqQyxnQkFBZ0IsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDL0Isb0JBQW9CLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsYUFBYTtBQUNiLFlBQVksS0FBSyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUU7QUFDakMsZ0JBQWdCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDekMsb0JBQW9CLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsb0JBQW9CLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0MsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixZQUFZLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsU0FBUztBQUNULGFBQWE7QUFDYixZQUFZLEtBQUssTUFBTSxHQUFHLElBQUksQ0FBQyxFQUFFO0FBQ2pDLGdCQUFnQixhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMLElBQUksS0FBSyxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUU7QUFDbkMsUUFBUSxJQUFJLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQztBQUM1QixZQUFZLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7QUFDcEMsS0FBSztBQUNMLElBQUksT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQUMsWUFBWSxFQUFFO0FBQ3pDLElBQUksT0FBTyxPQUFPLFlBQVksS0FBSyxRQUFRLElBQUksWUFBWSxLQUFLLElBQUksR0FBRyxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3pGLENBQUM7QUF5SUQ7QUFDQSxTQUFTLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN6QyxJQUFJLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO0FBQzdCLFFBQVEsU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDO0FBQzdDLFFBQVEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFDMUMsS0FBSztBQUNMLENBQUM7QUFDRCxTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRTtBQUNqQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUU7QUFDOUMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDcEQsSUFBSSxNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQztBQUMxRSxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMzQztBQUNBLElBQUksbUJBQW1CLENBQUMsTUFBTTtBQUM5QixRQUFRLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JFLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDeEIsWUFBWSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsY0FBYyxDQUFDLENBQUM7QUFDL0MsU0FBUztBQUNULGFBQWE7QUFDYjtBQUNBO0FBQ0EsWUFBWSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDcEMsU0FBUztBQUNULFFBQVEsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ25DLEtBQUssQ0FBQyxDQUFDO0FBQ1AsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUNELFNBQVMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRTtBQUNqRCxJQUFJLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUM7QUFDNUIsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEtBQUssSUFBSSxFQUFFO0FBQzlCLFFBQVEsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUMvQixRQUFRLEVBQUUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEQ7QUFDQTtBQUNBLFFBQVEsRUFBRSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztBQUMzQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3BCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRTtBQUNsQyxJQUFJLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDdEMsUUFBUSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekMsUUFBUSxlQUFlLEVBQUUsQ0FBQztBQUMxQixRQUFRLFNBQVMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuQyxLQUFLO0FBQ0wsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFDRCxTQUFTLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzdGLElBQUksTUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztBQUMvQyxJQUFJLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3JDLElBQUksTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7QUFDNUMsSUFBSSxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsRUFBRSxHQUFHO0FBQzlCLFFBQVEsUUFBUSxFQUFFLElBQUk7QUFDdEIsUUFBUSxHQUFHLEVBQUUsSUFBSTtBQUNqQjtBQUNBLFFBQVEsS0FBSztBQUNiLFFBQVEsTUFBTSxFQUFFLElBQUk7QUFDcEIsUUFBUSxTQUFTO0FBQ2pCLFFBQVEsS0FBSyxFQUFFLFlBQVksRUFBRTtBQUM3QjtBQUNBLFFBQVEsUUFBUSxFQUFFLEVBQUU7QUFDcEIsUUFBUSxVQUFVLEVBQUUsRUFBRTtBQUN0QixRQUFRLGFBQWEsRUFBRSxFQUFFO0FBQ3pCLFFBQVEsWUFBWSxFQUFFLEVBQUU7QUFDeEIsUUFBUSxPQUFPLEVBQUUsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDN0U7QUFDQSxRQUFRLFNBQVMsRUFBRSxZQUFZLEVBQUU7QUFDakMsUUFBUSxLQUFLO0FBQ2IsUUFBUSxVQUFVLEVBQUUsS0FBSztBQUN6QixLQUFLLENBQUM7QUFDTixJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztBQUN0QixJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsUUFBUTtBQUNyQixVQUFVLFFBQVEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksS0FBSztBQUNoRSxZQUFZLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN0RCxZQUFZLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxTQUFTLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFO0FBQ25FLGdCQUFnQixJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNqRCxvQkFBb0IsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QyxnQkFBZ0IsSUFBSSxLQUFLO0FBQ3pCLG9CQUFvQixVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzdDLGFBQWE7QUFDYixZQUFZLE9BQU8sR0FBRyxDQUFDO0FBQ3ZCLFNBQVMsQ0FBQztBQUNWLFVBQVUsRUFBRSxDQUFDO0FBQ2IsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM5QjtBQUNBLElBQUksRUFBRSxDQUFDLFFBQVEsR0FBRyxlQUFlLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDcEUsSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDeEIsUUFBUSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDN0IsWUFBWSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25EO0FBQ0EsWUFBWSxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELFlBQVksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsQyxTQUFTO0FBQ1QsYUFBYTtBQUNiO0FBQ0EsWUFBWSxFQUFFLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDM0MsU0FBUztBQUNULFFBQVEsSUFBSSxPQUFPLENBQUMsS0FBSztBQUN6QixZQUFZLGFBQWEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELFFBQVEsZUFBZSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNuRSxRQUFRLEtBQUssRUFBRSxDQUFDO0FBQ2hCLEtBQUs7QUFDTCxJQUFJLHFCQUFxQixDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDNUMsQ0FBQztBQXlDRCxNQUFNLGVBQWUsQ0FBQztBQUN0QixJQUFJLFFBQVEsR0FBRztBQUNmLFFBQVEsaUJBQWlCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25DLFFBQVEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDN0IsS0FBSztBQUNMLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDeEIsUUFBUSxNQUFNLFNBQVMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RGLFFBQVEsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxRQUFRLE9BQU8sTUFBTTtBQUNyQixZQUFZLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsWUFBWSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUM7QUFDNUIsZ0JBQWdCLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNDLFNBQVMsQ0FBQztBQUNWLEtBQUs7QUFDTCxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDbEIsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDOUMsWUFBWSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdEMsWUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLFlBQVksSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0FBQ3ZDLFNBQVM7QUFDVCxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0EsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNwQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtBQUNsQyxJQUFJLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3RELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN6QixDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDMUMsSUFBSSxZQUFZLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFDOUQsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBQ0QsU0FBUyxVQUFVLENBQUMsSUFBSSxFQUFFO0FBQzFCLElBQUksWUFBWSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5QyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNqQixDQUFDO0FBZ0JELFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRTtBQUM5RixJQUFJLE1BQU0sU0FBUyxHQUFHLE9BQU8sS0FBSyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxPQUFPLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3ZHLElBQUksSUFBSSxtQkFBbUI7QUFDM0IsUUFBUSxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDekMsSUFBSSxJQUFJLG9CQUFvQjtBQUM1QixRQUFRLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMxQyxJQUFJLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDbkYsSUFBSSxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDMUQsSUFBSSxPQUFPLE1BQU07QUFDakIsUUFBUSxZQUFZLENBQUMsOEJBQThCLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0FBQzFGLFFBQVEsT0FBTyxFQUFFLENBQUM7QUFDbEIsS0FBSyxDQUFDO0FBQ04sQ0FBQztBQUNELFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO0FBQzFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDakMsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJO0FBQ3JCLFFBQVEsWUFBWSxDQUFDLDBCQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7QUFDdEU7QUFDQSxRQUFRLFlBQVksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUMxRSxDQUFDO0FBQ0QsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7QUFDekMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQzNCLElBQUksWUFBWSxDQUFDLHNCQUFzQixFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFLRCxTQUFTLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ2xDLElBQUksSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDckIsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSTtBQUMvQixRQUFRLE9BQU87QUFDZixJQUFJLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzRCxJQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLENBQUM7QUFDRCxTQUFTLHNCQUFzQixDQUFDLEdBQUcsRUFBRTtBQUNyQyxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEVBQUUsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxRQUFRLElBQUksR0FBRyxDQUFDLEVBQUU7QUFDekYsUUFBUSxJQUFJLEdBQUcsR0FBRyxnREFBZ0QsQ0FBQztBQUNuRSxRQUFRLElBQUksT0FBTyxNQUFNLEtBQUssVUFBVSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtBQUMzRSxZQUFZLEdBQUcsSUFBSSwrREFBK0QsQ0FBQztBQUNuRixTQUFTO0FBQ1QsUUFBUSxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDMUMsSUFBSSxLQUFLLE1BQU0sUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDOUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ3RDLFlBQVksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsK0JBQStCLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakYsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDO0FBQ0QsTUFBTSxrQkFBa0IsU0FBUyxlQUFlLENBQUM7QUFDakQsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFFBQVEsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDaEUsWUFBWSxNQUFNLElBQUksS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDN0QsU0FBUztBQUNULFFBQVEsS0FBSyxFQUFFLENBQUM7QUFDaEIsS0FBSztBQUNMLElBQUksUUFBUSxHQUFHO0FBQ2YsUUFBUSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDekIsUUFBUSxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU07QUFDOUIsWUFBWSxPQUFPLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDNUQsU0FBUyxDQUFDO0FBQ1YsS0FBSztBQUNMLElBQUksY0FBYyxHQUFHLEdBQUc7QUFDeEIsSUFBSSxhQUFhLEdBQUcsR0FBRztBQUN2Qjs7QUM1bkRBLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2hDLElBQUksT0FBTztBQUNYLFFBQVEsU0FBUyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsU0FBUztBQUNuRCxLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsSUFBSSxFQUFFO0FBQ3ZDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDYixJQUFJLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUMzQixJQUFJLFNBQVMsR0FBRyxDQUFDLFNBQVMsRUFBRTtBQUM1QixRQUFRLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRTtBQUM5QyxZQUFZLEtBQUssR0FBRyxTQUFTLENBQUM7QUFDOUIsWUFBWSxJQUFJLElBQUksRUFBRTtBQUN0QixnQkFBZ0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUM7QUFDM0QsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDaEUsb0JBQW9CLE1BQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDM0Isb0JBQW9CLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEQsaUJBQWlCO0FBQ2pCLGdCQUFnQixJQUFJLFNBQVMsRUFBRTtBQUMvQixvQkFBb0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ3pFLHdCQUF3QixnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RSxxQkFBcUI7QUFDckIsb0JBQW9CLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDaEQsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMLElBQUksU0FBUyxNQUFNLENBQUMsRUFBRSxFQUFFO0FBQ3hCLFFBQVEsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLEtBQUs7QUFDTCxJQUFJLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRSxVQUFVLEdBQUcsSUFBSSxFQUFFO0FBQy9DLFFBQVEsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDN0MsUUFBUSxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLFFBQVEsSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN0QyxZQUFZLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3RDLFNBQVM7QUFDVCxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQixRQUFRLE9BQU8sTUFBTTtBQUNyQixZQUFZLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDMUQsWUFBWSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtBQUM5QixnQkFBZ0IsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDN0MsYUFBYTtBQUNiLFlBQVksSUFBSSxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMxQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7QUFDdkIsZ0JBQWdCLElBQUksR0FBRyxJQUFJLENBQUM7QUFDNUIsYUFBYTtBQUNiLFNBQVMsQ0FBQztBQUNWLEtBQUs7QUFDTCxJQUFJLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxDQUFDO0FBQ3RDOztBQzdETyxNQUFNLFdBQVcsR0FBRyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lGQ1NELEdBQWMsT0FBSSxXQUFXOzs7Ozs7Ozs7Ozs7OzttRkFVOUIsR0FBYyxPQUFJLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NEQVB2QyxHQUFXOzs7OzttSEFIQSxHQUFjLE9BQUksV0FBVzs7OztxSEFVOUIsR0FBYyxPQUFJLFdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQVNsRCxjQUFjLEdBQUcsS0FBSzs7VUFFakIsV0FBVztrQkFDbEIsY0FBYyxJQUFJLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CcEMsTUFBTSxhQUFhLEdBQUc7SUFDcEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxRQUFRLENBQVUsSUFBSSxDQUFDLENBQUE7SUFFbEQsT0FBTztRQUNMLE9BQU8sRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDeEIsUUFBUSxFQUFFLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMxQixTQUFTO0tBQ1YsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVNLE1BQU0sWUFBWSxHQUFHLGFBQWEsRUFBRTs7QUNVcEMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDdkMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0NxQjdCLEdBQU8sZ0JBQUksR0FBSSxNQUFHLENBQUMsYUFBSSxHQUFJLE1BQUcsRUFBRSxZQUFHLEdBQUksTUFBRyxHQUFHLGNBQUcsR0FBSTtpREFBcUIsR0FBTyxNQUFHLElBQUk7Ozs7Ozs7O3VDQUF2RixHQUFPLGdCQUFJLEdBQUksTUFBRyxDQUFDLGFBQUksR0FBSSxNQUFHLEVBQUUsWUFBRyxHQUFJLE1BQUcsR0FBRyxjQUFHLEdBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFIN0QsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDOzs7O2dDQUFoQixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7cUNBRDZCLEdBQUksZUFBRSxHQUFJO3VDQUFhLEdBQUs7Ozs7Ozs7Ozs7OztpQkFDeEQsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDOzs7OytCQUFoQixNQUFJOzs7Ozs7Ozs7Ozs7Ozs7O29DQUFKLE1BQUk7Ozs7c0NBRDZCLEdBQUksZUFBRSxHQUFJOzs7O3dDQUFhLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F0Q3BELElBQUksR0FBRyxFQUFFO09BQ1QsS0FBSyxHQUFHLFNBQVM7T0FDakIsSUFBSSxHQUFHLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzZCQ1NSLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NERBRGlDLEdBQWU7Ozs7Ozs7Ozs7MkRBQ3JELEdBQUs7Ozs7NkRBRGlDLEdBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BSzFELGVBQWUsR0FBRyxTQUFTO09BQzNCLEtBQUssR0FBRyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JDZHZCLEdBQWE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQWNsQixPQUFPO0VBQ0gsWUFBWSxDQUFDLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJDa0JsQixHQUFLLElBQUMsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OytEQUFYLEdBQUssSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQ0FSVDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5RUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BNUJFLEtBQUs7T0FDVixHQUFHLEdBQUcsYUFBYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0VDc0IrQixHQUFRLElBQUMsQ0FBQyxnQkFBUSxHQUFNLElBQUMsS0FBSzsrQkFBM0QsR0FBTSxJQUFDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt1REFBYSxHQUFRLElBQUMsQ0FBQzsyREFBUSxHQUFNLElBQUMsS0FBSzs7Ozs7Ozs7bURBQTNELEdBQU0sSUFBQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttREFFUyxHQUFNLElBQUMsS0FBSzsrQkFBbkMsR0FBTSxJQUFDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29GQUFPLEdBQU0sSUFBQyxLQUFLOzs7bURBQW5DLEdBQU0sSUFBQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJBRHJDLEdBQU07Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQUFOLEdBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQUpSLEdBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VEQURPLEdBQVEsSUFBQyxDQUFDLGdCQUFRLEdBQU0sSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dURBQTlCLEdBQVEsSUFBQyxDQUFDOzBEQUFRLEdBQU0sSUFBQyxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWJwQyxNQUFNO09BQ04sS0FBSztPQUNMLE1BQU07T0FDTixRQUFRO09BQ1IsTUFBTTtPQUNOLE1BQU0sR0FBRyxJQUFJO09BQ2IsTUFBTSxHQUFHLElBQUk7T0FDYixNQUFNO0NBRWpCLFdBQVcsQ0FBQyxNQUFNO0NBQ2xCLFVBQVUsQ0FBQyxXQUFXLEVBQUUsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWHhCLE1BQU0sTUFBTSxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUNyRTtBQUNPLE1BQU0sVUFBVSxHQUFHO0FBQzFCLENBQUM7QUFDRCxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFPLHFCQUE4QixpTUFBQztBQUNsRCxFQUFFO0FBQ0YsQ0FBQztBQUNELEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQU8sdUJBQXNDLGlOQUFDO0FBQzFELEVBQUU7QUFDRixDQUFDO0FBQ0QsRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBTyxxQkFBb0MsNk1BQUM7QUFDeEQsRUFBRTtBQUNGLENBQUM7QUFDRCxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFPLHVCQUFzQyxpTkFBQztBQUMxRCxFQUFFO0FBQ0YsQ0FBQztBQUNELEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQU8scUJBQW9DLDZNQUFDO0FBQ3hELEVBQUU7QUFDRixDQUFDO0FBQ0QsRUFBRSxFQUFFLEVBQUUsTUFBTSxvQkFBTyxxQkFBbUMsMk1BQUM7QUFDdkQsRUFBRTtBQUNGLENBQUM7QUFDRCxFQUFFLEVBQUUsRUFBRSxNQUFNLG9CQUFPLHNCQUFvQyw2TUFBQztBQUN4RCxFQUFFO0FBQ0YsQ0FBQztBQUNELEVBQUUsRUFBRSxFQUFFLE1BQU0sb0JBQU8scUJBQW1DLDJNQUFDO0FBQ3ZELEVBQUU7QUFDRixDQUFDLENBQUM7QUFDRjtBQUNPLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJO0FBQzVCLENBQUM7QUFDRDtBQUNBLEVBQUUsT0FBTyxFQUFFLE1BQU07QUFDakIsRUFBRSxLQUFLLEVBQUU7QUFDVCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxjQUFjO0FBQ3pCLEVBQUUsS0FBSyxFQUFFO0FBQ1QsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDWCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxjQUFjO0FBQ3pCLEVBQUUsS0FBSyxFQUFFO0FBQ1QsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDWCxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNYLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxhQUFhO0FBQ3hCLEVBQUUsS0FBSyxFQUFFO0FBQ1QsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDWCxHQUFHO0FBQ0gsRUFBRTtBQUNGO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsRUFBRSxPQUFPLEVBQUUsdUJBQXVCO0FBQ2xDLEVBQUUsS0FBSyxFQUFFO0FBQ1QsR0FBRyxJQUFJO0FBQ1AsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3JELEdBQUc7QUFDSCxFQUFFO0FBQ0Y7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxFQUFFLE9BQU8sRUFBRSxhQUFhO0FBQ3hCLEVBQUUsS0FBSyxFQUFFO0FBQ1QsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDWCxHQUFHO0FBQ0gsRUFBRTtBQUNGLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3ZCO0FBQ0EsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7QUFDbkMsQ0FBQyxvQkFBTyxpQ0FBaUYsbU9BQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJO0FBQzFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QixFQUFFLENBQUMsQ0FBQztBQUNKOztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDdEQsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ0EsU0FBUyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQzNCLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHO0FBQ3RELFFBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDL0IsSUFBSSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBQ0Q7QUFDQSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDWixTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUU7QUFDcEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ1osQ0FBQztBQUNELElBQUksR0FBRyxDQUFDO0FBQ1IsU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFFO0FBQ3BCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNaLENBQUM7QUFDRCxNQUFNLFFBQVEsR0FBRyxPQUFPLE9BQU8sS0FBSyxXQUFXLEdBQUcsT0FBTyxHQUFHO0FBQzVELElBQUksU0FBUyxFQUFFLE1BQU0sR0FBRztBQUN4QixJQUFJLFlBQVksRUFBRSxNQUFNLEdBQUc7QUFDM0IsSUFBSSxpQkFBaUIsRUFBRSxNQUFNO0FBQzdCLENBQUMsQ0FBQztBQUNGLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUMxQixTQUFTLGlCQUFpQixHQUFHO0FBQzdCLElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDeEMsUUFBUSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQztBQUN4QyxRQUFRLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JELFFBQVEsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQzdELFFBQVEsSUFBSSxNQUFNO0FBQ2xCLFlBQVksT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDckQsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGFBQWEsQ0FBQztBQUNsQixTQUFTQSxNQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDcEIsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDO0FBQzVCLElBQUksSUFBSSxtQkFBbUIsSUFBSSxRQUFRLEVBQUU7QUFDekMsUUFBUSxRQUFRLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0FBQzlDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksZ0JBQWdCLENBQUMsY0FBYyxFQUFFLE1BQU07QUFDM0MsUUFBUSxRQUFRLENBQUMsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO0FBQzVDLEtBQUssQ0FBQyxDQUFDO0FBQ1A7QUFDQSxJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxNQUFNO0FBQ25DLFFBQVEsUUFBUSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztBQUM5QyxLQUFLLENBQUMsQ0FBQztBQUNQLElBQUksZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQzVDLElBQUksZ0JBQWdCLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFDRCxTQUFTLGFBQWEsQ0FBQyxNQUFNLEVBQUU7QUFDL0IsSUFBSSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUMzQixRQUFRLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUk7QUFDMUQsWUFBWSxNQUFNLEdBQUcsR0FBRyxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RILFlBQVksSUFBSSxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxRQUFRO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxQyxZQUFZLElBQUksT0FBTyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2QztBQUNBLGdCQUFnQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ25DLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsS0FBSztBQUNMLElBQUksT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUNELFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRTtBQUM1QixJQUFJLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsTUFBTTtBQUN0QyxRQUFRLE9BQU8sSUFBSSxDQUFDO0FBQ3BCLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztBQUMxQyxRQUFRLE9BQU8sSUFBSSxDQUFDO0FBQ3BCLElBQUksSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25ELElBQUksSUFBSSxJQUFJLEtBQUssRUFBRSxFQUFFO0FBQ3JCLFFBQVEsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNuQixLQUFLO0FBQ0w7QUFDQSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRCxRQUFRLE9BQU87QUFDZixJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDL0MsUUFBUSxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEMsUUFBUSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQyxRQUFRLElBQUksS0FBSyxFQUFFO0FBQ25CLFlBQVksTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwRCxZQUFZLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsWUFBWSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2pFLFlBQVksTUFBTSxJQUFJLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDO0FBQ3RFLFlBQVksT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDMUQsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFO0FBQzdCO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDMUIsUUFBUSxPQUFPO0FBQ2YsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNO0FBQ3hFLFFBQVEsT0FBTztBQUNmLElBQUksSUFBSSxLQUFLLENBQUMsZ0JBQWdCO0FBQzlCLFFBQVEsT0FBTztBQUNmLElBQUksTUFBTSxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQ1YsUUFBUSxPQUFPO0FBQ2YsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUk7QUFDZixRQUFRLE9BQU87QUFDZjtBQUNBO0FBQ0EsSUFBSSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxtQkFBbUIsQ0FBQztBQUM5RixJQUFJLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZELElBQUksSUFBSSxJQUFJLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRTtBQUNoQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSTtBQUMxQixZQUFZLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNuQyxRQUFRLE9BQU87QUFDZixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxVQUFVO0FBQzFFLFFBQVEsT0FBTztBQUNmO0FBQ0EsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsTUFBTTtBQUN6QyxRQUFRLE9BQU87QUFDZixJQUFJLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCO0FBQ0EsSUFBSSxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxNQUFNO0FBQzVFLFFBQVEsT0FBTztBQUNmLElBQUksTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RDLElBQUksSUFBSSxNQUFNLEVBQUU7QUFDaEIsUUFBUSxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDM0QsUUFBUSxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25ELFFBQVEsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9CLFFBQVEsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RELEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ3RCLElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7QUFDN0QsQ0FBQztBQUNELFNBQVMsWUFBWSxHQUFHO0FBQ3hCLElBQUksT0FBTztBQUNYLFFBQVEsQ0FBQyxFQUFFLFdBQVc7QUFDdEIsUUFBUSxDQUFDLEVBQUUsV0FBVztBQUN0QixLQUFLLENBQUM7QUFDTixDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsS0FBSyxFQUFFO0FBQ2hDLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksRUFBRSxDQUFDO0FBQ3pDLElBQUksSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO0FBQ3JCLFFBQVEsTUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLFFBQVEsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLFFBQVEsSUFBSSxNQUFNLEVBQUU7QUFDcEIsWUFBWSxRQUFRLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0MsU0FBUztBQUNULGFBQWE7QUFDYjtBQUNBLFlBQVksUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQzFDLFNBQVM7QUFDVCxLQUFLO0FBQ0wsU0FBUztBQUNUO0FBQ0EsUUFBUSxPQUFPLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLFFBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFFBQVEsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlELEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQzVDLElBQUksT0FBTyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLGFBQWE7QUFDeEQsUUFBUSxNQUFNLFFBQVEsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzlCLFFBQVEsSUFBSSxRQUFRLEVBQUU7QUFDdEIsWUFBWSxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLFNBQVM7QUFDVCxhQUFhO0FBQ2IsWUFBWSxNQUFNLGNBQWMsR0FBRyxZQUFZLEVBQUUsQ0FBQztBQUNsRDtBQUNBLFlBQVksY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGNBQWMsQ0FBQztBQUNqRCxZQUFZLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDN0IsWUFBWSxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxHQUFHLGNBQWMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQzdFLFNBQVM7QUFDVCxRQUFRLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFFBQVEsSUFBSSxRQUFRLENBQUMsYUFBYSxLQUFLLFFBQVEsQ0FBQyxhQUFhLFlBQVksV0FBVyxDQUFDO0FBQ3JGLFlBQVksUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMxQyxRQUFRLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDdkIsWUFBWSxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDNUMsWUFBWSxJQUFJLFdBQVcsQ0FBQztBQUM1QixZQUFZLElBQUksSUFBSSxFQUFFO0FBQ3RCO0FBQ0EsZ0JBQWdCLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxnQkFBZ0IsSUFBSSxXQUFXLEVBQUU7QUFDakMsb0JBQW9CLE1BQU0sR0FBRztBQUM3Qix3QkFBd0IsQ0FBQyxFQUFFLENBQUM7QUFDNUIsd0JBQXdCLENBQUMsRUFBRSxXQUFXLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsT0FBTztBQUM1RSxxQkFBcUIsQ0FBQztBQUN0QixpQkFBaUI7QUFDakIsYUFBYTtBQUNiLFlBQVksY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQztBQUN6QyxZQUFZLElBQUksUUFBUSxJQUFJLFdBQVcsRUFBRTtBQUN6QyxnQkFBZ0IsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzdDLGFBQWE7QUFDYixpQkFBaUI7QUFDakIsZ0JBQWdCLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNBLFNBQVMsWUFBWSxDQUFDLGVBQWUsRUFBRTtBQUN2QyxJQUFJLElBQUksT0FBTyxHQUFHLGVBQWUsQ0FBQyxPQUFPLENBQUM7QUFDMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2xCLFFBQVEsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDO0FBQzNFLEtBQUs7QUFDTCxJQUFJLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFDRDtBQUNBLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztBQUN2QixJQUFJLGlCQUFpQixDQUFDO0FBQ3RCLFNBQVMsS0FBSyxHQUFHO0FBQ2pCLElBQUksZ0JBQWdCLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDckQsSUFBSSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNwRCxDQUFDO0FBQ0QsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFO0FBQ3hCLElBQUksTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLElBQUksSUFBSSxNQUFNLEVBQUU7QUFDaEIsUUFBUSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3ZELFlBQVksV0FBVyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztBQUNwRSxTQUFTO0FBQ1QsUUFBUSxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUM7QUFDbkMsS0FBSztBQUNMLENBQUM7QUFDRCxTQUFTLGNBQWMsQ0FBQyxNQUFNLEVBQUU7QUFDaEMsSUFBSSxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDekQsUUFBUSxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUM7QUFDbkMsS0FBSztBQUNMLFNBQVM7QUFDVCxRQUFRLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7QUFDakMsSUFBSSxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBSyxVQUFVLEVBQUU7QUFDbkMsUUFBUSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7QUFDakMsSUFBSSxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUNwQyxJQUFJLGlCQUFpQixHQUFHLFVBQVUsQ0FBQyxNQUFNO0FBQ3pDLFFBQVEsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUNEO0FBQ0EsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxFQUFFO0FBQ3JFLElBQUksTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLElBQUksSUFBSSxNQUFNLEVBQUU7QUFDaEIsUUFBUSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxjQUFjLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFGLFFBQVEsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDckQsS0FBSztBQUNMLElBQUksUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDekIsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU07QUFDN0I7QUFDQSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNBLFNBQVMsVUFBVSxDQUFDLEtBQUssRUFBRTtBQUMzQixJQUFJLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQyxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztBQUNyQixJQUFJLFNBQVMsTUFBTSxHQUFHO0FBQ3RCLFFBQVEsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNyQixRQUFRLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLEtBQUs7QUFDTCxJQUFJLFNBQVMsR0FBRyxDQUFDLFNBQVMsRUFBRTtBQUM1QixRQUFRLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDdEIsUUFBUSxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLEtBQUs7QUFDTCxJQUFJLFNBQVMsU0FBUyxDQUFDLEdBQUcsRUFBRTtBQUM1QixRQUFRLElBQUksU0FBUyxDQUFDO0FBQ3RCLFFBQVEsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsU0FBUyxLQUFLO0FBQzlDLFlBQVksSUFBSSxTQUFTLEtBQUssU0FBUyxLQUFLLEtBQUssSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLEVBQUU7QUFDL0UsZ0JBQWdCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLENBQUM7QUFDM0MsYUFBYTtBQUNiLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsS0FBSztBQUNMLElBQUksT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7QUFDdEMsQ0FBQztBQUNEO0FBQ0EsTUFBTSxZQUFZLEdBQUcsT0FBTyxVQUFVLEtBQUssV0FBVyxJQUFJLFVBQVUsQ0FBQztBQUNyRSxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbEIsSUFBSSxjQUFjLENBQUM7QUFDbkIsSUFBSSxhQUFhLENBQUM7QUFDbEIsSUFBSSxjQUFjLENBQUM7QUFDbkIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztBQUN6QixNQUFNLE1BQU0sR0FBRztBQUNmLElBQUksSUFBSSxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUM7QUFDeEIsSUFBSSxVQUFVLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQztBQUM5QixJQUFJLE9BQU8sRUFBRSxRQUFRLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUM7QUFDM0QsQ0FBQyxDQUFDO0FBQ0YsSUFBSSxRQUFRLENBQUM7QUFDYixJQUFJLGFBQWEsQ0FBQztBQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsYUFBYTtBQUNuRixJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDckIsSUFBSSxJQUFJLENBQUMsS0FBSztBQUNkLFFBQVEsT0FBTztBQUNmLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztBQUN6QixJQUFJLE1BQU0sSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN2RCxJQUFJLE1BQU0sS0FBSyxHQUFHLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFDckMsSUFBSSxNQUFNLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRSxJQUFJLElBQUksS0FBSyxLQUFLLGFBQWE7QUFDL0IsUUFBUSxPQUFPO0FBQ2YsSUFBSSxJQUFJLFFBQVEsRUFBRTtBQUNsQixRQUFRLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RCxLQUFLO0FBQ0wsU0FBUztBQUNULFFBQVEsTUFBTSxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDeEUsS0FBSztBQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDSixJQUFJLE1BQU0sQ0FBQztBQUNYLFNBQVMsVUFBVSxDQUFDLElBQUksRUFBRTtBQUMxQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbEIsQ0FBQztBQUNELFNBQVMsT0FBTyxDQUFDLElBQUksRUFBRTtBQUN2QixJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUIsSUFBSUEsTUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUM7QUFDaEQsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUNaLElBQUksSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO0FBQzVCLFFBQVEsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU07QUFDNUMsWUFBWSxPQUFPLFlBQVksRUFBRSxDQUFDO0FBQ2xDLFNBQVMsQ0FBQyxDQUFDO0FBQ1gsS0FBSztBQUNMLElBQUksT0FBTyxpQkFBaUIsRUFBRSxDQUFDO0FBQy9CLENBQUM7QUFDRCxTQUFTLFlBQVksR0FBRztBQUN4QixJQUFJLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQztBQUNoRCxJQUFJLE1BQU0sRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxZQUFZLENBQUM7QUFDL0QsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO0FBQ3pCLFFBQVEsY0FBYyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkQsS0FBSztBQUNMLElBQUksTUFBTSxLQUFLLEdBQUc7QUFDbEIsUUFBUSxLQUFLO0FBQ2IsUUFBUSxNQUFNO0FBQ2QsUUFBUSxPQUFPO0FBQ2YsUUFBUSxNQUFNLEVBQUU7QUFDaEIsWUFBWSxLQUFLLEVBQUUsY0FBYztBQUNqQyxTQUFTO0FBQ1QsUUFBUSxNQUFNLEVBQUU7QUFDaEIsWUFBWSxLQUFLLEVBQUU7QUFDbkIsZ0JBQWdCLE1BQU07QUFDdEIsZ0JBQWdCLEtBQUs7QUFDckIsYUFBYTtBQUNiLFlBQVksU0FBUyxFQUFFQyxPQUFjO0FBQ3JDLFNBQVM7QUFDVCxRQUFRLFFBQVEsRUFBRSxTQUFTO0FBQzNCLEtBQUssQ0FBQztBQUNOLElBQUksTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLElBQUksTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFDRCxTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUU7QUFDdkMsSUFBSSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsS0FBSyxDQUFDO0FBQzVCLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUNELFNBQVMsZUFBZSxDQUFDLElBQUksRUFBRTtBQUMvQixJQUFJLE9BQU8sU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxhQUFhO0FBQ3hELFFBQVEsSUFBSSxjQUFjO0FBQzFCLFlBQVksTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsUUFBUSxNQUFNLFNBQVMsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0MsUUFBUSxNQUFNLEtBQUssR0FBRyxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3pDLFFBQVEsTUFBTSxlQUFlLEdBQUcsTUFBTSxTQUFTLENBQUM7QUFDaEQsUUFBUSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsZUFBZSxDQUFDO0FBQzdDLFFBQVEsSUFBSSxLQUFLLEtBQUssYUFBYTtBQUNuQyxZQUFZLE9BQU87QUFDbkIsUUFBUSxJQUFJLFFBQVEsRUFBRTtBQUN0QixZQUFZLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNsRSxTQUFTO0FBQ1QsYUFBYTtBQUNiLFlBQVksTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsR0FBRyxlQUFlLENBQUM7QUFDdEQsWUFBWSxNQUFNLE1BQU0sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM1RSxTQUFTO0FBQ1QsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7QUFDckMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsYUFBYTtBQUN4RCxRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLFFBQVEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsUUFBUSxJQUFJLGNBQWMsRUFBRTtBQUM1QixZQUFZLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkMsU0FBUztBQUNULGFBQWE7QUFDYixZQUFZLEtBQUssQ0FBQyxNQUFNLEdBQUc7QUFDM0IsZ0JBQWdCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUMxRCxnQkFBZ0IsVUFBVSxFQUFFLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFO0FBQ3RFLGdCQUFnQixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU87QUFDdkMsYUFBYSxDQUFDO0FBQ2QsWUFBWSxLQUFLLENBQUMsTUFBTSxHQUFHO0FBQzNCLGdCQUFnQixLQUFLLEVBQUUsTUFBTSxjQUFjO0FBQzNDLGFBQWEsQ0FBQztBQUNkLFlBQVksS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUM5QyxZQUFZLGNBQWMsR0FBRyxJQUFJLEdBQUcsQ0FBQztBQUNyQyxnQkFBZ0IsTUFBTTtBQUN0QixnQkFBZ0IsS0FBSztBQUNyQixnQkFBZ0IsT0FBTyxFQUFFLElBQUk7QUFDN0IsYUFBYSxDQUFDLENBQUM7QUFDZixTQUFTO0FBQ1QsUUFBUSxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBQ2hDLFFBQVEsYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25ELFFBQVEsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNyQixRQUFRLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDOUIsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0QsU0FBUyxZQUFZLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSxJQUFJLGlCQUFpQixLQUFLLGFBQWE7QUFDM0MsUUFBUSxPQUFPLElBQUksQ0FBQztBQUNwQixJQUFJLE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxJQUFJLElBQUksQ0FBQyxRQUFRO0FBQ2pCLFFBQVEsT0FBTyxLQUFLLENBQUM7QUFDckIsSUFBSSxJQUFJLE9BQU8sS0FBSyxRQUFRLENBQUMsT0FBTztBQUNwQyxRQUFRLE9BQU8sSUFBSSxDQUFDO0FBQ3BCLElBQUksSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFO0FBQ3hCLFFBQVEsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3RHLFlBQVksT0FBTyxJQUFJLENBQUM7QUFDeEIsU0FBUztBQUNULEtBQUs7QUFDTCxDQUFDO0FBQ0QsU0FBUyxjQUFjLENBQUMsSUFBSSxFQUFFO0FBQzlCLElBQUksT0FBTyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLGFBQWE7QUFDeEQsUUFBUSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztBQUNyQyxRQUFRLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5RCxRQUFRLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztBQUM1QixRQUFRLE1BQU0sS0FBSyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDNUUsUUFBUSxNQUFNLGVBQWUsR0FBRztBQUNoQyxZQUFZLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEtBQUssS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7QUFDbEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxLQUFLO0FBQ2hELGdCQUFnQixJQUFJLFFBQVEsS0FBSyxRQUFRLENBQUMsVUFBVSxLQUFLLFVBQVUsSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxFQUFFO0FBQ3hHLG9CQUFvQixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCLGdCQUFnQixRQUFRLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUM7QUFDcEQsYUFBYTtBQUNiLFlBQVksS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssS0FBSztBQUN0QyxnQkFBZ0IsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLEtBQUssS0FBSyxRQUFRLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ25GLGdCQUFnQixLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUN0QyxhQUFhO0FBQ2IsU0FBUyxDQUFDO0FBQ1YsUUFBUSxJQUFJLENBQUMsY0FBYyxFQUFFO0FBQzdCLFlBQVksTUFBTSxZQUFZLEdBQUdDLFNBQWlCLEtBQUssT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25FLFlBQVksY0FBYyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7QUFDN0YsZ0JBQWdCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtBQUMvQixnQkFBZ0IsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQy9CLGdCQUFnQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDakMsZ0JBQWdCLE1BQU0sRUFBRSxFQUFFO0FBQzFCLGFBQWEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN6QixTQUFTO0FBQ1QsUUFBUSxJQUFJLE1BQU0sQ0FBQztBQUNuQixRQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNsQixRQUFRLElBQUk7QUFDWixZQUFZLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDakUsWUFBWSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEQsWUFBWSxJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDdEMsWUFBWSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLGFBQWE7QUFDakgsZ0JBQWdCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM1QyxnQkFBZ0IsSUFBSSxZQUFZLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLENBQUM7QUFDdEUsb0JBQW9CLGFBQWEsR0FBRyxJQUFJLENBQUM7QUFDekMsZ0JBQWdCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUNwRCxnQkFBZ0IsSUFBSSxDQUFDLElBQUk7QUFDekIsb0JBQW9CLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUN2QyxnQkFBZ0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDOUIsZ0JBQWdCLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxhQUFhLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRTtBQUNoSCxvQkFBb0IsT0FBTyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0MsaUJBQWlCO0FBQ2pCLGdCQUFnQixhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQ3RDLGdCQUFnQixNQUFNLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDdEYsZ0JBQWdCLElBQUksU0FBUyxDQUFDO0FBQzlCLGdCQUFnQixJQUFJLEtBQUssSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzdELG9CQUFvQixTQUFTLEdBQUcsT0FBTztBQUN2QywwQkFBMEIsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUM5RCw0QkFBNEIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQzNDLDRCQUE0QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7QUFDM0MsNEJBQTRCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztBQUM3Qyw0QkFBNEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUM5RSx5QkFBeUIsRUFBRSxRQUFRLENBQUM7QUFDcEMsMEJBQTBCLEVBQUUsQ0FBQztBQUM3QixpQkFBaUI7QUFDakIscUJBQXFCO0FBQ3JCLG9CQUFvQixTQUFTLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDOUQsaUJBQWlCO0FBQ2pCLGdCQUFnQixRQUFRLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDNUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLFNBQVM7QUFDVCxRQUFRLE9BQU8sS0FBSyxFQUFFO0FBQ3RCLFlBQVksS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDaEMsWUFBWSxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUMvQixZQUFZLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDeEIsU0FBUztBQUNULFFBQVEsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUM7QUFDM0MsS0FBSyxDQUFDLENBQUM7QUFDUDs7QUMzZ0JBLENBQUMsVUFBVSxNQUFNLEVBQUU7QUFDbkIsRUFBRSxPQUFPLFVBQVUsS0FBSyxRQUFRO0FBQ2hDLElBQUksSUFBSTtBQUNSLE1BQU0sR0FBRyxFQUFFO0FBQ1gsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFFO0FBQ3RELFFBQVEsWUFBWSxFQUFFLElBQUk7QUFDMUIsUUFBUSxHQUFHLEVBQUUsR0FBRztBQUNoQixPQUFPLENBQUMsRUFBRSxHQUFHLENBQUM7QUFDZCxHQUFHLENBQUM7QUFDSixFQUFFLFNBQVMsR0FBRyxHQUFHO0FBQ2pCLElBQUksSUFBSSxNQUFNLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQztBQUM5QixJQUFJLE1BQU0sQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0FBQy9CLElBQUksT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUNoQyxHQUFHO0FBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ1gsbUJBQWUsVUFBVTs7QUNaekJDLE9BQVksQ0FBQztJQUNYLE1BQU0sRUFBRSxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztDQUMxQyxDQUFDOzs7OyJ9
