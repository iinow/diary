import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, P as createEventDispatcher, ad as getContext, z as onMount, A as assign, B as exclude_internal_props, R as tick, af as current_component, c as create_component, k as claim_component, p as mount_component, r as transition_in, u as transition_out, x as destroy_component, e as element, t as text, g as claim_element, h as children, j as claim_text, b as detach_dev, l as attr_dev, I as toggle_class, m as add_location, n as insert_dev, o as append_dev, a5 as set_data_dev, a as space, f as claim_space, D as group_outros, E as check_outros, F as bubble, O as binding_callbacks, H as set_attributes, ag as action_destroyer, J as listen_dev, L as get_spread_update, a6 as run_all, a7 as validate_each_argument, y as globals, ah as bind, q as query_selector_all, ai as add_flush_callback, a8 as destroy_each } from './client.a6b1653e.js';
import { o as omit, g as getEventsAction, I as Icon } from './index.7eb5c434.js';
import { e as client, s as src } from './ApolloClientStore.3582e0c8.js';
import { O as Observable, c as Subscription, h as hostReportError, o as observable, d as isObject, _ as __extends, S as Subscriber } from './async.e8aaa12b.js';
import { m as map, f as filter, t as tap, o as operators } from './tap.b91a43c7.js';
import { i as interval } from './interval.ca3f1e3c.js';

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var subscribeToArray = function (array) {
    return function (subscriber) {
        for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) {
            subscriber.next(array[i]);
        }
        subscriber.complete();
    };
};

/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
function scheduleArray(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        var i = 0;
        sub.add(scheduler.schedule(function () {
            if (i === input.length) {
                subscriber.complete();
                return;
            }
            subscriber.next(input[i++]);
            if (!subscriber.closed) {
                sub.add(this.schedule());
            }
        }));
        return sub;
    });
}

/** PURE_IMPORTS_START _hostReportError PURE_IMPORTS_END */
var subscribeToPromise = function (promise) {
    return function (subscriber) {
        promise.then(function (value) {
            if (!subscriber.closed) {
                subscriber.next(value);
                subscriber.complete();
            }
        }, function (err) { return subscriber.error(err); })
            .then(null, hostReportError);
        return subscriber;
    };
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function getSymbolIterator() {
    if (typeof Symbol !== 'function' || !Symbol.iterator) {
        return '@@iterator';
    }
    return Symbol.iterator;
}
var iterator = /*@__PURE__*/ getSymbolIterator();

/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
var subscribeToIterable = function (iterable) {
    return function (subscriber) {
        var iterator$1 = iterable[iterator]();
        do {
            var item = void 0;
            try {
                item = iterator$1.next();
            }
            catch (err) {
                subscriber.error(err);
                return subscriber;
            }
            if (item.done) {
                subscriber.complete();
                break;
            }
            subscriber.next(item.value);
            if (subscriber.closed) {
                break;
            }
        } while (true);
        if (typeof iterator$1.return === 'function') {
            subscriber.add(function () {
                if (iterator$1.return) {
                    iterator$1.return();
                }
            });
        }
        return subscriber;
    };
};

/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
var subscribeToObservable = function (obj) {
    return function (subscriber) {
        var obs = obj[observable]();
        if (typeof obs.subscribe !== 'function') {
            throw new TypeError('Provided object does not correctly implement Symbol.observable');
        }
        else {
            return obs.subscribe(subscriber);
        }
    };
};

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArrayLike = (function (x) { return x && typeof x.length === 'number' && typeof x !== 'function'; });

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isPromise(value) {
    return !!value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
}

/** PURE_IMPORTS_START _subscribeToArray,_subscribeToPromise,_subscribeToIterable,_subscribeToObservable,_isArrayLike,_isPromise,_isObject,_symbol_iterator,_symbol_observable PURE_IMPORTS_END */
var subscribeTo = function (result) {
    if (!!result && typeof result[observable] === 'function') {
        return subscribeToObservable(result);
    }
    else if (isArrayLike(result)) {
        return subscribeToArray(result);
    }
    else if (isPromise(result)) {
        return subscribeToPromise(result);
    }
    else if (!!result && typeof result[iterator] === 'function') {
        return subscribeToIterable(result);
    }
    else {
        var value = isObject(result) ? 'an invalid object' : "'" + result + "'";
        var msg = "You provided " + value + " where a stream was expected."
            + ' You can provide an Observable, Promise, Array, or Iterable.';
        throw new TypeError(msg);
    }
};

/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_observable PURE_IMPORTS_END */
function scheduleObservable(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        sub.add(scheduler.schedule(function () {
            var observable$1 = input[observable]();
            sub.add(observable$1.subscribe({
                next: function (value) { sub.add(scheduler.schedule(function () { return subscriber.next(value); })); },
                error: function (err) { sub.add(scheduler.schedule(function () { return subscriber.error(err); })); },
                complete: function () { sub.add(scheduler.schedule(function () { return subscriber.complete(); })); },
            }));
        }));
        return sub;
    });
}

/** PURE_IMPORTS_START _Observable,_Subscription PURE_IMPORTS_END */
function schedulePromise(input, scheduler) {
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        sub.add(scheduler.schedule(function () {
            return input.then(function (value) {
                sub.add(scheduler.schedule(function () {
                    subscriber.next(value);
                    sub.add(scheduler.schedule(function () { return subscriber.complete(); }));
                }));
            }, function (err) {
                sub.add(scheduler.schedule(function () { return subscriber.error(err); }));
            });
        }));
        return sub;
    });
}

/** PURE_IMPORTS_START _Observable,_Subscription,_symbol_iterator PURE_IMPORTS_END */
function scheduleIterable(input, scheduler) {
    if (!input) {
        throw new Error('Iterable cannot be null');
    }
    return new Observable(function (subscriber) {
        var sub = new Subscription();
        var iterator$1;
        sub.add(function () {
            if (iterator$1 && typeof iterator$1.return === 'function') {
                iterator$1.return();
            }
        });
        sub.add(scheduler.schedule(function () {
            iterator$1 = input[iterator]();
            sub.add(scheduler.schedule(function () {
                if (subscriber.closed) {
                    return;
                }
                var value;
                var done;
                try {
                    var result = iterator$1.next();
                    value = result.value;
                    done = result.done;
                }
                catch (err) {
                    subscriber.error(err);
                    return;
                }
                if (done) {
                    subscriber.complete();
                }
                else {
                    subscriber.next(value);
                    this.schedule();
                }
            }));
        }));
        return sub;
    });
}

/** PURE_IMPORTS_START _symbol_observable PURE_IMPORTS_END */
function isInteropObservable(input) {
    return input && typeof input[observable] === 'function';
}

/** PURE_IMPORTS_START _symbol_iterator PURE_IMPORTS_END */
function isIterable(input) {
    return input && typeof input[iterator] === 'function';
}

/** PURE_IMPORTS_START _scheduleObservable,_schedulePromise,_scheduleArray,_scheduleIterable,_util_isInteropObservable,_util_isPromise,_util_isArrayLike,_util_isIterable PURE_IMPORTS_END */
function scheduled(input, scheduler) {
    if (input != null) {
        if (isInteropObservable(input)) {
            return scheduleObservable(input, scheduler);
        }
        else if (isPromise(input)) {
            return schedulePromise(input, scheduler);
        }
        else if (isArrayLike(input)) {
            return scheduleArray(input, scheduler);
        }
        else if (isIterable(input) || typeof input === 'string') {
            return scheduleIterable(input, scheduler);
        }
    }
    throw new TypeError((input !== null && typeof input || input) + ' is not observable');
}

/** PURE_IMPORTS_START _Observable,_util_subscribeTo,_scheduled_scheduled PURE_IMPORTS_END */
function from(input, scheduler) {
    if (!scheduler) {
        if (input instanceof Observable) {
            return input;
        }
        return new Observable(subscribeTo(input));
    }
    else {
        return scheduled(input, scheduler);
    }
}

/** PURE_IMPORTS_START tslib,_Subscriber,_Observable,_util_subscribeTo PURE_IMPORTS_END */
var SimpleInnerSubscriber = /*@__PURE__*/ (function (_super) {
    __extends(SimpleInnerSubscriber, _super);
    function SimpleInnerSubscriber(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        return _this;
    }
    SimpleInnerSubscriber.prototype._next = function (value) {
        this.parent.notifyNext(value);
    };
    SimpleInnerSubscriber.prototype._error = function (error) {
        this.parent.notifyError(error);
        this.unsubscribe();
    };
    SimpleInnerSubscriber.prototype._complete = function () {
        this.parent.notifyComplete();
        this.unsubscribe();
    };
    return SimpleInnerSubscriber;
}(Subscriber));
var SimpleOuterSubscriber = /*@__PURE__*/ (function (_super) {
    __extends(SimpleOuterSubscriber, _super);
    function SimpleOuterSubscriber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleOuterSubscriber.prototype.notifyNext = function (innerValue) {
        this.destination.next(innerValue);
    };
    SimpleOuterSubscriber.prototype.notifyError = function (err) {
        this.destination.error(err);
    };
    SimpleOuterSubscriber.prototype.notifyComplete = function () {
        this.destination.complete();
    };
    return SimpleOuterSubscriber;
}(Subscriber));
function innerSubscribe(result, innerSubscriber) {
    if (innerSubscriber.closed) {
        return undefined;
    }
    if (result instanceof Observable) {
        return result.subscribe(innerSubscriber);
    }
    return subscribeTo(result)(innerSubscriber);
}

/** PURE_IMPORTS_START tslib,_map,_observable_from,_innerSubscribe PURE_IMPORTS_END */
function switchMap(project, resultSelector) {
    if (typeof resultSelector === 'function') {
        return function (source) { return source.pipe(switchMap(function (a, i) { return from(project(a, i)).pipe(map(function (b, ii) { return resultSelector(a, b, i, ii); })); })); };
    }
    return function (source) { return source.lift(new SwitchMapOperator(project)); };
}
var SwitchMapOperator = /*@__PURE__*/ (function () {
    function SwitchMapOperator(project) {
        this.project = project;
    }
    SwitchMapOperator.prototype.call = function (subscriber, source) {
        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project));
    };
    return SwitchMapOperator;
}());
var SwitchMapSubscriber = /*@__PURE__*/ (function (_super) {
    __extends(SwitchMapSubscriber, _super);
    function SwitchMapSubscriber(destination, project) {
        var _this = _super.call(this, destination) || this;
        _this.project = project;
        _this.index = 0;
        return _this;
    }
    SwitchMapSubscriber.prototype._next = function (value) {
        var result;
        var index = this.index++;
        try {
            result = this.project(value, index);
        }
        catch (error) {
            this.destination.error(error);
            return;
        }
        this._innerSub(result);
    };
    SwitchMapSubscriber.prototype._innerSub = function (result) {
        var innerSubscription = this.innerSubscription;
        if (innerSubscription) {
            innerSubscription.unsubscribe();
        }
        var innerSubscriber = new SimpleInnerSubscriber(this);
        var destination = this.destination;
        destination.add(innerSubscriber);
        this.innerSubscription = innerSubscribe(result, innerSubscriber);
        if (this.innerSubscription !== innerSubscriber) {
            destination.add(this.innerSubscription);
        }
    };
    SwitchMapSubscriber.prototype._complete = function () {
        var innerSubscription = this.innerSubscription;
        if (!innerSubscription || innerSubscription.closed) {
            _super.prototype._complete.call(this);
        }
        this.unsubscribe();
    };
    SwitchMapSubscriber.prototype._unsubscribe = function () {
        this.innerSubscription = undefined;
    };
    SwitchMapSubscriber.prototype.notifyComplete = function () {
        this.innerSubscription = undefined;
        if (this.isStopped) {
            _super.prototype._complete.call(this);
        }
    };
    SwitchMapSubscriber.prototype.notifyNext = function (innerValue) {
        this.destination.next(innerValue);
    };
    return SwitchMapSubscriber;
}(SimpleOuterSubscriber));

/* node_modules/svelma/src/components/Input.svelte generated by Svelte v3.30.1 */
const file = "node_modules/svelma/src/components/Input.svelte";

// (157:2) {:else}
function create_else_block(ctx) {
	let textarea;
	let textarea_class_value;
	let events_action;
	let mounted;
	let dispose;

	let textarea_levels = [
		/*props*/ ctx[17],
		{ value: /*value*/ ctx[0] },
		{
			class: textarea_class_value = "textarea " + /*statusType*/ ctx[11] + "\n      " + /*size*/ ctx[2]
		},
		{ disabled: /*disabled*/ ctx[10] }
	];

	let textarea_data = {};

	for (let i = 0; i < textarea_levels.length; i += 1) {
		textarea_data = assign(textarea_data, textarea_levels[i]);
	}

	const block = {
		c: function create() {
			textarea = element("textarea");
			this.h();
		},
		l: function claim(nodes) {
			textarea = claim_element(nodes, "TEXTAREA", { value: true, class: true, disabled: true });
			children(textarea).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_attributes(textarea, textarea_data);
			toggle_class(textarea, "svelte-1ijweja", true);
			add_location(textarea, file, 157, 4, 4349);
		},
		m: function mount(target, anchor) {
			insert_dev(target, textarea, anchor);
			/*textarea_binding*/ ctx[31](textarea);

			if (!mounted) {
				dispose = [
					action_destroyer(events_action = /*events*/ ctx[25].call(null, textarea)),
					listen_dev(textarea, "input", /*onInput*/ ctx[22], false, false, false),
					listen_dev(textarea, "focus", /*onFocus*/ ctx[23], false, false, false),
					listen_dev(textarea, "blur", /*onBlur*/ ctx[24], false, false, false),
					listen_dev(textarea, "change", /*change_handler_1*/ ctx[29], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			set_attributes(textarea, textarea_data = get_spread_update(textarea_levels, [
				dirty[0] & /*props*/ 131072 && /*props*/ ctx[17],
				dirty[0] & /*value*/ 1 && { value: /*value*/ ctx[0] },
				dirty[0] & /*statusType, size*/ 2052 && textarea_class_value !== (textarea_class_value = "textarea " + /*statusType*/ ctx[11] + "\n      " + /*size*/ ctx[2]) && { class: textarea_class_value },
				dirty[0] & /*disabled*/ 1024 && { disabled: /*disabled*/ ctx[10] }
			]));

			toggle_class(textarea, "svelte-1ijweja", true);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(textarea);
			/*textarea_binding*/ ctx[31](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_else_block.name,
		type: "else",
		source: "(157:2) {:else}",
		ctx
	});

	return block;
}

// (144:2) {#if type !== 'textarea'}
function create_if_block_3(ctx) {
	let input_1;
	let input_1_class_value;
	let events_action;
	let mounted;
	let dispose;

	let input_1_levels = [
		/*props*/ ctx[17],
		{ type: /*newType*/ ctx[14] },
		{ value: /*value*/ ctx[0] },
		{
			class: input_1_class_value = "input " + /*statusType*/ ctx[11] + " " + /*size*/ ctx[2] + " " + (/*$$props*/ ctx[26].class || "")
		},
		{ disabled: /*disabled*/ ctx[10] }
	];

	let input_1_data = {};

	for (let i = 0; i < input_1_levels.length; i += 1) {
		input_1_data = assign(input_1_data, input_1_levels[i]);
	}

	const block = {
		c: function create() {
			input_1 = element("input");
			this.h();
		},
		l: function claim(nodes) {
			input_1 = claim_element(nodes, "INPUT", {
				type: true,
				value: true,
				class: true,
				disabled: true
			});

			this.h();
		},
		h: function hydrate() {
			set_attributes(input_1, input_1_data);
			toggle_class(input_1, "svelte-1ijweja", true);
			add_location(input_1, file, 144, 4, 4064);
		},
		m: function mount(target, anchor) {
			insert_dev(target, input_1, anchor);
			input_1.value = input_1_data.value;
			/*input_1_binding*/ ctx[30](input_1);

			if (!mounted) {
				dispose = [
					action_destroyer(events_action = /*events*/ ctx[25].call(null, input_1)),
					listen_dev(input_1, "input", /*onInput*/ ctx[22], false, false, false),
					listen_dev(input_1, "focus", /*onFocus*/ ctx[23], false, false, false),
					listen_dev(input_1, "blur", /*onBlur*/ ctx[24], false, false, false),
					listen_dev(input_1, "change", /*change_handler*/ ctx[28], false, false, false)
				];

				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			set_attributes(input_1, input_1_data = get_spread_update(input_1_levels, [
				dirty[0] & /*props*/ 131072 && /*props*/ ctx[17],
				dirty[0] & /*newType*/ 16384 && { type: /*newType*/ ctx[14] },
				dirty[0] & /*value*/ 1 && input_1.value !== /*value*/ ctx[0] && { value: /*value*/ ctx[0] },
				dirty[0] & /*statusType, size, $$props*/ 67110916 && input_1_class_value !== (input_1_class_value = "input " + /*statusType*/ ctx[11] + " " + /*size*/ ctx[2] + " " + (/*$$props*/ ctx[26].class || "")) && { class: input_1_class_value },
				dirty[0] & /*disabled*/ 1024 && { disabled: /*disabled*/ ctx[10] }
			]));

			if ("value" in input_1_data) {
				input_1.value = input_1_data.value;
			}

			toggle_class(input_1, "svelte-1ijweja", true);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(input_1);
			/*input_1_binding*/ ctx[30](null);
			mounted = false;
			run_all(dispose);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(144:2) {#if type !== 'textarea'}",
		ctx
	});

	return block;
}

// (172:2) {#if icon}
function create_if_block_2(ctx) {
	let icon_1;
	let current;

	icon_1 = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				isLeft: true,
				icon: /*icon*/ ctx[8]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_1_changes = {};
			if (dirty[0] & /*iconPack*/ 512) icon_1_changes.pack = /*iconPack*/ ctx[9];
			if (dirty[0] & /*icon*/ 256) icon_1_changes.icon = /*icon*/ ctx[8];
			icon_1.$set(icon_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(172:2) {#if icon}",
		ctx
	});

	return block;
}

// (179:2) {#if !loading && (passwordReveal || statusType)}
function create_if_block_1(ctx) {
	let icon_1;
	let current;

	icon_1 = new Icon({
			props: {
				pack: "fas",
				isRight: true,
				isClickable: /*passwordReveal*/ ctx[4],
				icon: /*passwordReveal*/ ctx[4]
				? /*passwordVisibleIcon*/ ctx[20]
				: /*statusTypeIcon*/ ctx[15],
				type: !/*passwordReveal*/ ctx[4]
				? /*statusType*/ ctx[11]
				: "is-primary"
			},
			$$inline: true
		});

	icon_1.$on("click", /*togglePasswordVisibility*/ ctx[21]);

	const block = {
		c: function create() {
			create_component(icon_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_1_changes = {};
			if (dirty[0] & /*passwordReveal*/ 16) icon_1_changes.isClickable = /*passwordReveal*/ ctx[4];

			if (dirty[0] & /*passwordReveal, passwordVisibleIcon, statusTypeIcon*/ 1081360) icon_1_changes.icon = /*passwordReveal*/ ctx[4]
			? /*passwordVisibleIcon*/ ctx[20]
			: /*statusTypeIcon*/ ctx[15];

			if (dirty[0] & /*passwordReveal, statusType*/ 2064) icon_1_changes.type = !/*passwordReveal*/ ctx[4]
			? /*statusType*/ ctx[11]
			: "is-primary";

			icon_1.$set(icon_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(179:2) {#if !loading && (passwordReveal || statusType)}",
		ctx
	});

	return block;
}

// (191:2) {#if maxlength && hasCounter && type !== 'number'}
function create_if_block(ctx) {
	let small;
	let t0;
	let t1;
	let t2;

	const block = {
		c: function create() {
			small = element("small");
			t0 = text(/*valueLength*/ ctx[16]);
			t1 = text(" / ");
			t2 = text(/*maxlength*/ ctx[5]);
			this.h();
		},
		l: function claim(nodes) {
			small = claim_element(nodes, "SMALL", { class: true });
			var small_nodes = children(small);
			t0 = claim_text(small_nodes, /*valueLength*/ ctx[16]);
			t1 = claim_text(small_nodes, " / ");
			t2 = claim_text(small_nodes, /*maxlength*/ ctx[5]);
			small_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(small, "class", "help counter svelte-1ijweja");
			toggle_class(small, "is-invisible", !/*isFocused*/ ctx[13]);
			add_location(small, file, 191, 4, 5106);
		},
		m: function mount(target, anchor) {
			insert_dev(target, small, anchor);
			append_dev(small, t0);
			append_dev(small, t1);
			append_dev(small, t2);
		},
		p: function update(ctx, dirty) {
			if (dirty[0] & /*valueLength*/ 65536) set_data_dev(t0, /*valueLength*/ ctx[16]);
			if (dirty[0] & /*maxlength*/ 32) set_data_dev(t2, /*maxlength*/ ctx[5]);

			if (dirty[0] & /*isFocused*/ 8192) {
				toggle_class(small, "is-invisible", !/*isFocused*/ ctx[13]);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(small);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(191:2) {#if maxlength && hasCounter && type !== 'number'}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let t0;
	let t1;
	let t2;
	let current;

	function select_block_type(ctx, dirty) {
		if (/*type*/ ctx[1] !== "textarea") return create_if_block_3;
		return create_else_block;
	}

	let current_block_type = select_block_type(ctx);
	let if_block0 = current_block_type(ctx);
	let if_block1 = /*icon*/ ctx[8] && create_if_block_2(ctx);
	let if_block2 = !/*loading*/ ctx[7] && (/*passwordReveal*/ ctx[4] || /*statusType*/ ctx[11]) && create_if_block_1(ctx);
	let if_block3 = /*maxlength*/ ctx[5] && /*hasCounter*/ ctx[6] && /*type*/ ctx[1] !== "number" && create_if_block(ctx);

	const block = {
		c: function create() {
			div = element("div");
			if_block0.c();
			t0 = space();
			if (if_block1) if_block1.c();
			t1 = space();
			if (if_block2) if_block2.c();
			t2 = space();
			if (if_block3) if_block3.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { class: true });
			var div_nodes = children(div);
			if_block0.l(div_nodes);
			t0 = claim_space(div_nodes);
			if (if_block1) if_block1.l(div_nodes);
			t1 = claim_space(div_nodes);
			if (if_block2) if_block2.l(div_nodes);
			t2 = claim_space(div_nodes);
			if (if_block3) if_block3.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "class", "control svelte-1ijweja");
			toggle_class(div, "has-icons-left", /*hasIconLeft*/ ctx[18]);
			toggle_class(div, "has-icons-right", /*hasIconRight*/ ctx[19]);
			toggle_class(div, "is-loading", /*loading*/ ctx[7]);
			toggle_class(div, "is-expanded", /*expanded*/ ctx[3]);
			add_location(div, file, 141, 0, 3881);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			if_block0.m(div, null);
			append_dev(div, t0);
			if (if_block1) if_block1.m(div, null);
			append_dev(div, t1);
			if (if_block2) if_block2.m(div, null);
			append_dev(div, t2);
			if (if_block3) if_block3.m(div, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
				if_block0.p(ctx, dirty);
			} else {
				if_block0.d(1);
				if_block0 = current_block_type(ctx);

				if (if_block0) {
					if_block0.c();
					if_block0.m(div, t0);
				}
			}

			if (/*icon*/ ctx[8]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty[0] & /*icon*/ 256) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_2(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(div, t1);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			if (!/*loading*/ ctx[7] && (/*passwordReveal*/ ctx[4] || /*statusType*/ ctx[11])) {
				if (if_block2) {
					if_block2.p(ctx, dirty);

					if (dirty[0] & /*loading, passwordReveal, statusType*/ 2192) {
						transition_in(if_block2, 1);
					}
				} else {
					if_block2 = create_if_block_1(ctx);
					if_block2.c();
					transition_in(if_block2, 1);
					if_block2.m(div, t2);
				}
			} else if (if_block2) {
				group_outros();

				transition_out(if_block2, 1, 1, () => {
					if_block2 = null;
				});

				check_outros();
			}

			if (/*maxlength*/ ctx[5] && /*hasCounter*/ ctx[6] && /*type*/ ctx[1] !== "number") {
				if (if_block3) {
					if_block3.p(ctx, dirty);
				} else {
					if_block3 = create_if_block(ctx);
					if_block3.c();
					if_block3.m(div, null);
				}
			} else if (if_block3) {
				if_block3.d(1);
				if_block3 = null;
			}

			if (dirty[0] & /*hasIconLeft*/ 262144) {
				toggle_class(div, "has-icons-left", /*hasIconLeft*/ ctx[18]);
			}

			if (dirty[0] & /*hasIconRight*/ 524288) {
				toggle_class(div, "has-icons-right", /*hasIconRight*/ ctx[19]);
			}

			if (dirty[0] & /*loading*/ 128) {
				toggle_class(div, "is-loading", /*loading*/ ctx[7]);
			}

			if (dirty[0] & /*expanded*/ 8) {
				toggle_class(div, "is-expanded", /*expanded*/ ctx[3]);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block1);
			transition_in(if_block2);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block1);
			transition_out(if_block2);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if_block0.d();
			if (if_block1) if_block1.d();
			if (if_block2) if_block2.d();
			if (if_block3) if_block3.d();
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
	validate_slots("Input", slots, []);
	let { value = "" } = $$props;
	let { type = "text" } = $$props;
	let { size = "" } = $$props;
	let { expanded = false } = $$props;
	let { passwordReveal = false } = $$props;
	let { maxlength = null } = $$props;
	let { hasCounter = true } = $$props;
	let { loading = false } = $$props;
	let { icon = "" } = $$props;
	let { iconPack = "" } = $$props;
	let { disabled = false } = $$props;
	let input;
	let isFocused;
	let isPasswordVisible = false;
	let newType = "text";
	let statusType = "";
	let statusTypeIcon = "";
	let valueLength = null;
	const dispatch = createEventDispatcher();
	const getType = getContext("type");
	if (getType) statusType = getType() || "";

	onMount(() => {
		$$invalidate(14, newType = type);
	});

	async function togglePasswordVisibility() {
		$$invalidate(27, isPasswordVisible = !isPasswordVisible);
		$$invalidate(14, newType = isPasswordVisible ? "text" : "password");
		await tick();
		input.focus();
	}

	const onInput = e => {
		$$invalidate(0, value = e.target.value);
		$$invalidate(26, $$props.value = value, $$props);
		dispatch("input", e);
	};

	const onFocus = () => $$invalidate(13, isFocused = true);
	const onBlur = () => $$invalidate(13, isFocused = false);
	const events = getEventsAction(current_component);

	function change_handler(event) {
		bubble($$self, event);
	}

	function change_handler_1(event) {
		bubble($$self, event);
	}

	function input_1_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			input = $$value;
			$$invalidate(12, input);
		});
	}

	function textarea_binding($$value) {
		binding_callbacks[$$value ? "unshift" : "push"](() => {
			input = $$value;
			$$invalidate(12, input);
		});
	}

	$$self.$$set = $$new_props => {
		$$invalidate(26, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ("value" in $$new_props) $$invalidate(0, value = $$new_props.value);
		if ("type" in $$new_props) $$invalidate(1, type = $$new_props.type);
		if ("size" in $$new_props) $$invalidate(2, size = $$new_props.size);
		if ("expanded" in $$new_props) $$invalidate(3, expanded = $$new_props.expanded);
		if ("passwordReveal" in $$new_props) $$invalidate(4, passwordReveal = $$new_props.passwordReveal);
		if ("maxlength" in $$new_props) $$invalidate(5, maxlength = $$new_props.maxlength);
		if ("hasCounter" in $$new_props) $$invalidate(6, hasCounter = $$new_props.hasCounter);
		if ("loading" in $$new_props) $$invalidate(7, loading = $$new_props.loading);
		if ("icon" in $$new_props) $$invalidate(8, icon = $$new_props.icon);
		if ("iconPack" in $$new_props) $$invalidate(9, iconPack = $$new_props.iconPack);
		if ("disabled" in $$new_props) $$invalidate(10, disabled = $$new_props.disabled);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		onMount,
		getContext,
		tick,
		omit,
		getEventsAction,
		current_component,
		Icon,
		value,
		type,
		size,
		expanded,
		passwordReveal,
		maxlength,
		hasCounter,
		loading,
		icon,
		iconPack,
		disabled,
		input,
		isFocused,
		isPasswordVisible,
		newType,
		statusType,
		statusTypeIcon,
		valueLength,
		dispatch,
		getType,
		togglePasswordVisibility,
		onInput,
		onFocus,
		onBlur,
		events,
		props,
		hasIconLeft,
		hasIconRight,
		passwordVisibleIcon
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(26, $$props = assign(assign({}, $$props), $$new_props));
		if ("value" in $$props) $$invalidate(0, value = $$new_props.value);
		if ("type" in $$props) $$invalidate(1, type = $$new_props.type);
		if ("size" in $$props) $$invalidate(2, size = $$new_props.size);
		if ("expanded" in $$props) $$invalidate(3, expanded = $$new_props.expanded);
		if ("passwordReveal" in $$props) $$invalidate(4, passwordReveal = $$new_props.passwordReveal);
		if ("maxlength" in $$props) $$invalidate(5, maxlength = $$new_props.maxlength);
		if ("hasCounter" in $$props) $$invalidate(6, hasCounter = $$new_props.hasCounter);
		if ("loading" in $$props) $$invalidate(7, loading = $$new_props.loading);
		if ("icon" in $$props) $$invalidate(8, icon = $$new_props.icon);
		if ("iconPack" in $$props) $$invalidate(9, iconPack = $$new_props.iconPack);
		if ("disabled" in $$props) $$invalidate(10, disabled = $$new_props.disabled);
		if ("input" in $$props) $$invalidate(12, input = $$new_props.input);
		if ("isFocused" in $$props) $$invalidate(13, isFocused = $$new_props.isFocused);
		if ("isPasswordVisible" in $$props) $$invalidate(27, isPasswordVisible = $$new_props.isPasswordVisible);
		if ("newType" in $$props) $$invalidate(14, newType = $$new_props.newType);
		if ("statusType" in $$props) $$invalidate(11, statusType = $$new_props.statusType);
		if ("statusTypeIcon" in $$props) $$invalidate(15, statusTypeIcon = $$new_props.statusTypeIcon);
		if ("valueLength" in $$props) $$invalidate(16, valueLength = $$new_props.valueLength);
		if ("props" in $$props) $$invalidate(17, props = $$new_props.props);
		if ("hasIconLeft" in $$props) $$invalidate(18, hasIconLeft = $$new_props.hasIconLeft);
		if ("hasIconRight" in $$props) $$invalidate(19, hasIconRight = $$new_props.hasIconRight);
		if ("passwordVisibleIcon" in $$props) $$invalidate(20, passwordVisibleIcon = $$new_props.passwordVisibleIcon);
	};

	let props;
	let hasIconLeft;
	let hasIconRight;
	let passwordVisibleIcon;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		 $$invalidate(17, props = {
			...omit($$props, "class", "value", "type", "size", "passwordReveal", "hasCounter", "loading", "disabled")
		});

		if ($$self.$$.dirty[0] & /*icon*/ 256) {
			 $$invalidate(18, hasIconLeft = !!icon);
		}

		if ($$self.$$.dirty[0] & /*passwordReveal, loading, statusType*/ 2192) {
			 $$invalidate(19, hasIconRight = passwordReveal || loading || statusType);
		}

		if ($$self.$$.dirty[0] & /*isPasswordVisible*/ 134217728) {
			 $$invalidate(20, passwordVisibleIcon = isPasswordVisible ? "eye-slash" : "eye");
		}

		if ($$self.$$.dirty[0] & /*statusType*/ 2048) {
			 {
				switch (statusType) {
					case "is-success":
						$$invalidate(15, statusTypeIcon = "check");
						break;
					case "is-danger":
						$$invalidate(15, statusTypeIcon = "exclamation-circle");
						break;
					case "is-info":
						$$invalidate(15, statusTypeIcon = "info-circle");
						break;
					case "is-warning":
						$$invalidate(15, statusTypeIcon = "exclamation-triangle");
						break;
				}
			}
		}

		if ($$self.$$.dirty[0] & /*value*/ 1) {
			 {
				if (typeof value === "string") {
					$$invalidate(16, valueLength = value.length);
				} else if (typeof value === "number") {
					$$invalidate(16, valueLength = value.toString().length);
				} else {
					$$invalidate(16, valueLength = 0);
				}
			}
		}
	};

	$$props = exclude_internal_props($$props);

	return [
		value,
		type,
		size,
		expanded,
		passwordReveal,
		maxlength,
		hasCounter,
		loading,
		icon,
		iconPack,
		disabled,
		statusType,
		input,
		isFocused,
		newType,
		statusTypeIcon,
		valueLength,
		props,
		hasIconLeft,
		hasIconRight,
		passwordVisibleIcon,
		togglePasswordVisibility,
		onInput,
		onFocus,
		onBlur,
		events,
		$$props,
		isPasswordVisible,
		change_handler,
		change_handler_1,
		input_1_binding,
		textarea_binding
	];
}

class Input extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				value: 0,
				type: 1,
				size: 2,
				expanded: 3,
				passwordReveal: 4,
				maxlength: 5,
				hasCounter: 6,
				loading: 7,
				icon: 8,
				iconPack: 9,
				disabled: 10
			},
			[-1, -1]
		);

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Input",
			options,
			id: create_fragment.name
		});
	}

	get value() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set value(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get expanded() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set expanded(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get passwordReveal() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set passwordReveal(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get maxlength() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set maxlength(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get hasCounter() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set hasCounter(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get loading() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set loading(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get icon() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set icon(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconPack() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconPack(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get disabled() {
		throw new Error("<Input>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set disabled(value) {
		throw new Error("<Input>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

var REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

/* src/routes/chat/index.svelte generated by Svelte v3.30.1 */

const { console: console_1 } = globals;
const file$1 = "src/routes/chat/index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[9] = list[i];
	return child_ctx;
}

// (57:2) {#each messageList as message}
function create_each_block(ctx) {
	let div;
	let t0_value = /*message*/ ctx[9] + "";
	let t0;
	let t1;

	const block = {
		c: function create() {
			div = element("div");
			t0 = text(t0_value);
			t1 = space();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);
			t0 = claim_text(div_nodes, t0_value);
			t1 = claim_space(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(div, file$1, 57, 2, 1593);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);
			append_dev(div, t0);
			append_dev(div, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*messageList*/ 2 && t0_value !== (t0_value = /*message*/ ctx[9] + "")) set_data_dev(t0, t0_value);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(57:2) {#each messageList as message}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let t0;
	let h1;
	let t1;
	let t2;
	let div;
	let t3;
	let input;
	let updating_value;
	let current;
	let each_value = /*messageList*/ ctx[1];
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	function input_value_binding(value) {
		/*input_value_binding*/ ctx[2].call(null, value);
	}

	let input_props = {};

	if (/*messages*/ ctx[0] !== void 0) {
		input_props.value = /*messages*/ ctx[0];
	}

	input = new Input({ props: input_props, $$inline: true });
	binding_callbacks.push(() => bind(input, "value", input_value_binding));

	const block = {
		c: function create() {
			t0 = space();
			h1 = element("h1");
			t1 = text("Chat");
			t2 = space();
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			t3 = space();
			create_component(input.$$.fragment);
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-1r6ueia\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			h1 = claim_element(nodes, "H1", {});
			var h1_nodes = children(h1);
			t1 = claim_text(h1_nodes, "Chat");
			h1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			div = claim_element(nodes, "DIV", {});
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			div_nodes.forEach(detach_dev);
			t3 = claim_space(nodes);
			claim_component(input.$$.fragment, nodes);
			this.h();
		},
		h: function hydrate() {
			document.title = "Chat";
			add_location(h1, file$1, 54, 0, 1538);
			add_location(div, file$1, 55, 0, 1552);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, h1, anchor);
			append_dev(h1, t1);
			insert_dev(target, t2, anchor);
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			insert_dev(target, t3, anchor);
			mount_component(input, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*messageList*/ 2) {
				each_value = /*messageList*/ ctx[1];
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

			const input_changes = {};

			if (!updating_value && dirty & /*messages*/ 1) {
				updating_value = true;
				input_changes.value = /*messages*/ ctx[0];
				add_flush_callback(() => updating_value = false);
			}

			input.$set(input_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(input.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(input.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(h1);
			if (detaching) detach_dev(t2);
			if (detaching) detach_dev(div);
			destroy_each(each_blocks, detaching);
			if (detaching) detach_dev(t3);
			destroy_component(input, detaching);
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
	validate_slots("Chat", slots, []);
	
	let messages = "";
	let lastMessages = "";
	let messageList = [];
	const uuid = v4();

	const publishMessageQuery = (topic, message) => {
		return src`
      mutation {
        publishMessage(topic: "${topic}", message: "${message}")
      }
    `;
	};

	const subscriptionMessages = topic => {
		return src`
      subscription {
        subscriptionMessage(topic: "${topic}") {
          text
          createdAt
        }
      }
    `;
	};

	onMount(() => {
		insertMessageObserver();
		subscribeMessage();
	});

	function insertMessageObserver() {
		interval(1000).pipe(filter(() => lastMessages !== messages), tap(() => lastMessages = messages), map(() => client.get()), operators.flatMap(apollo => apollo.mutate({
			mutation: publishMessageQuery(uuid, lastMessages)
		}))).subscribe(() => {
			console.log(uuid);
		});
	}

	function subscribeMessage() {
		client.get().subscribe({ query: subscriptionMessages(uuid) }).subscribe(res => {
			const obj = res.data.subscriptionMessage;
			messageList.push(obj.text);
			$$invalidate(1, messageList = [...messageList]);
		});
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console_1.warn(`<Chat> was created with unknown prop '${key}'`);
	});

	function input_value_binding(value) {
		messages = value;
		$$invalidate(0, messages);
	}

	$$self.$capture_state = () => ({
		onMount,
		interval,
		Input,
		client,
		filter,
		map,
		switchMap,
		tap,
		gql: src,
		uuidV4: v4,
		flatMap: operators.flatMap,
		messages,
		lastMessages,
		messageList,
		uuid,
		publishMessageQuery,
		subscriptionMessages,
		insertMessageObserver,
		subscribeMessage
	});

	$$self.$inject_state = $$props => {
		if ("messages" in $$props) $$invalidate(0, messages = $$props.messages);
		if ("lastMessages" in $$props) lastMessages = $$props.lastMessages;
		if ("messageList" in $$props) $$invalidate(1, messageList = $$props.messageList);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [messages, messageList, input_value_binding];
}

class Chat extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Chat",
			options,
			id: create_fragment$1.name
		});
	}
}

export default Chat;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguNWJlOWIyZDguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL19lc201L2ludGVybmFsL3V0aWwvc3Vic2NyaWJlVG9BcnJheS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUFycmF5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9zdWJzY3JpYmVUb1Byb21pc2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9fZXNtNS9pbnRlcm5hbC9zeW1ib2wvaXRlcmF0b3IuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL3N1YnNjcmliZVRvSXRlcmFibGUuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL3N1YnNjcmliZVRvT2JzZXJ2YWJsZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL19lc201L2ludGVybmFsL3V0aWwvaXNBcnJheUxpa2UuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9fZXNtNS9pbnRlcm5hbC91dGlsL2lzUHJvbWlzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL19lc201L2ludGVybmFsL3V0aWwvc3Vic2NyaWJlVG8uanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcnhqcy9fZXNtNS9pbnRlcm5hbC9zY2hlZHVsZWQvc2NoZWR1bGVPYnNlcnZhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlUHJvbWlzZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL19lc201L2ludGVybmFsL3NjaGVkdWxlZC9zY2hlZHVsZUl0ZXJhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9pc0ludGVyb3BPYnNlcnZhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvX2VzbTUvaW50ZXJuYWwvdXRpbC9pc0l0ZXJhYmxlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvX2VzbTUvaW50ZXJuYWwvc2NoZWR1bGVkL3NjaGVkdWxlZC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL19lc201L2ludGVybmFsL29ic2VydmFibGUvZnJvbS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9yeGpzL19lc201L2ludGVybmFsL2lubmVyU3Vic2NyaWJlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3J4anMvX2VzbTUvaW50ZXJuYWwvb3BlcmF0b3JzL3N3aXRjaE1hcC5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsbWEvc3JjL2NvbXBvbmVudHMvSW5wdXQuc3ZlbHRlIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci9ybmcuanMiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvdXVpZC9kaXN0L2VzbS1icm93c2VyL3JlZ2V4LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92YWxpZGF0ZS5qcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy91dWlkL2Rpc3QvZXNtLWJyb3dzZXIvc3RyaW5naWZ5LmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3V1aWQvZGlzdC9lc20tYnJvd3Nlci92NC5qcyIsIi4uLy4uLy4uL3NyYy9yb3V0ZXMvY2hhdC9pbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZXhwb3J0IHZhciBzdWJzY3JpYmVUb0FycmF5ID0gZnVuY3Rpb24gKGFycmF5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW4gJiYgIXN1YnNjcmliZXIuY2xvc2VkOyBpKyspIHtcbiAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChhcnJheVtpXSk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgIH07XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c3Vic2NyaWJlVG9BcnJheS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX1N1YnNjcmlwdGlvbiBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlQXJyYXkoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc3ViID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpID09PSBpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KGlucHV0W2krK10pO1xuICAgICAgICAgICAgaWYgKCFzdWJzY3JpYmVyLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgIHN1Yi5hZGQodGhpcy5zY2hlZHVsZSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVBcnJheS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX2hvc3RSZXBvcnRFcnJvciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBob3N0UmVwb3J0RXJyb3IgfSBmcm9tICcuL2hvc3RSZXBvcnRFcnJvcic7XG5leHBvcnQgdmFyIHN1YnNjcmliZVRvUHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIGlmICghc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQodmFsdWUpO1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KVxuICAgICAgICAgICAgLnRoZW4obnVsbCwgaG9zdFJlcG9ydEVycm9yKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmliZXI7XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVUb1Byb21pc2UuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3ltYm9sSXRlcmF0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICdmdW5jdGlvbicgfHwgIVN5bWJvbC5pdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gJ0BAaXRlcmF0b3InO1xuICAgIH1cbiAgICByZXR1cm4gU3ltYm9sLml0ZXJhdG9yO1xufVxuZXhwb3J0IHZhciBpdGVyYXRvciA9IC8qQF9fUFVSRV9fKi8gZ2V0U3ltYm9sSXRlcmF0b3IoKTtcbmV4cG9ydCB2YXIgJCRpdGVyYXRvciA9IGl0ZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXRlcmF0b3IuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9zeW1ib2xfaXRlcmF0b3IgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgaXRlcmF0b3IgYXMgU3ltYm9sX2l0ZXJhdG9yIH0gZnJvbSAnLi4vc3ltYm9sL2l0ZXJhdG9yJztcbmV4cG9ydCB2YXIgc3Vic2NyaWJlVG9JdGVyYWJsZSA9IGZ1bmN0aW9uIChpdGVyYWJsZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYWJsZVtTeW1ib2xfaXRlcmF0b3JdKCk7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gdm9pZCAwO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpdGVtID0gaXRlcmF0b3IubmV4dCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpdGVtLmRvbmUpIHtcbiAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpYmVyLm5leHQoaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAodHJ1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlcmF0b3IucmV0dXJuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBzdWJzY3JpYmVyLmFkZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvci5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9O1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN1YnNjcmliZVRvSXRlcmFibGUuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9zeW1ib2xfb2JzZXJ2YWJsZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBvYnNlcnZhYmxlIGFzIFN5bWJvbF9vYnNlcnZhYmxlIH0gZnJvbSAnLi4vc3ltYm9sL29ic2VydmFibGUnO1xuZXhwb3J0IHZhciBzdWJzY3JpYmVUb09ic2VydmFibGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBvYnMgPSBvYmpbU3ltYm9sX29ic2VydmFibGVdKCk7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUHJvdmlkZWQgb2JqZWN0IGRvZXMgbm90IGNvcnJlY3RseSBpbXBsZW1lbnQgU3ltYm9sLm9ic2VydmFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvYnMuc3Vic2NyaWJlKHN1YnNjcmliZXIpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVUb09ic2VydmFibGUuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5leHBvcnQgdmFyIGlzQXJyYXlMaWtlID0gKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHggIT09ICdmdW5jdGlvbic7IH0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheUxpa2UuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUICBQVVJFX0lNUE9SVFNfRU5EICovXG5leHBvcnQgZnVuY3Rpb24gaXNQcm9taXNlKHZhbHVlKSB7XG4gICAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlLnN1YnNjcmliZSAhPT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgdmFsdWUudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzUHJvbWlzZS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX3N1YnNjcmliZVRvQXJyYXksX3N1YnNjcmliZVRvUHJvbWlzZSxfc3Vic2NyaWJlVG9JdGVyYWJsZSxfc3Vic2NyaWJlVG9PYnNlcnZhYmxlLF9pc0FycmF5TGlrZSxfaXNQcm9taXNlLF9pc09iamVjdCxfc3ltYm9sX2l0ZXJhdG9yLF9zeW1ib2xfb2JzZXJ2YWJsZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBzdWJzY3JpYmVUb0FycmF5IH0gZnJvbSAnLi9zdWJzY3JpYmVUb0FycmF5JztcbmltcG9ydCB7IHN1YnNjcmliZVRvUHJvbWlzZSB9IGZyb20gJy4vc3Vic2NyaWJlVG9Qcm9taXNlJztcbmltcG9ydCB7IHN1YnNjcmliZVRvSXRlcmFibGUgfSBmcm9tICcuL3N1YnNjcmliZVRvSXRlcmFibGUnO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG9PYnNlcnZhYmxlIH0gZnJvbSAnLi9zdWJzY3JpYmVUb09ic2VydmFibGUnO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UgfSBmcm9tICcuL2lzQXJyYXlMaWtlJztcbmltcG9ydCB7IGlzUHJvbWlzZSB9IGZyb20gJy4vaXNQcm9taXNlJztcbmltcG9ydCB7IGlzT2JqZWN0IH0gZnJvbSAnLi9pc09iamVjdCc7XG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4uL3N5bWJvbC9vYnNlcnZhYmxlJztcbmV4cG9ydCB2YXIgc3Vic2NyaWJlVG8gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgaWYgKCEhcmVzdWx0ICYmIHR5cGVvZiByZXN1bHRbU3ltYm9sX29ic2VydmFibGVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBzdWJzY3JpYmVUb09ic2VydmFibGUocmVzdWx0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNBcnJheUxpa2UocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlVG9BcnJheShyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc1Byb21pc2UocmVzdWx0KSkge1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlVG9Qcm9taXNlKHJlc3VsdCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCEhcmVzdWx0ICYmIHR5cGVvZiByZXN1bHRbU3ltYm9sX2l0ZXJhdG9yXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlVG9JdGVyYWJsZShyZXN1bHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXNPYmplY3QocmVzdWx0KSA/ICdhbiBpbnZhbGlkIG9iamVjdCcgOiBcIidcIiArIHJlc3VsdCArIFwiJ1wiO1xuICAgICAgICB2YXIgbXNnID0gXCJZb3UgcHJvdmlkZWQgXCIgKyB2YWx1ZSArIFwiIHdoZXJlIGEgc3RyZWFtIHdhcyBleHBlY3RlZC5cIlxuICAgICAgICAgICAgKyAnIFlvdSBjYW4gcHJvdmlkZSBhbiBPYnNlcnZhYmxlLCBQcm9taXNlLCBBcnJheSwgb3IgSXRlcmFibGUuJztcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihtc2cpO1xuICAgIH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zdWJzY3JpYmVUby5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX1N1YnNjcmlwdGlvbixfc3ltYm9sX29ic2VydmFibGUgUFVSRV9JTVBPUlRTX0VORCAqL1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4uL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAnLi4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVPYnNlcnZhYmxlKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9ic2VydmFibGUgPSBpbnB1dFtTeW1ib2xfb2JzZXJ2YWJsZV0oKTtcbiAgICAgICAgICAgIHN1Yi5hZGQob2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7IHJldHVybiBzdWJzY3JpYmVyLm5leHQodmFsdWUpOyB9KSk7IH0sXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlcnIpIHsgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5lcnJvcihlcnIpOyB9KSk7IH0sXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uICgpIHsgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KSk7IH0sXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHN1YjtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlT2JzZXJ2YWJsZS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX1N1YnNjcmlwdGlvbiBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAnLi4vT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICcuLi9TdWJzY3JpcHRpb24nO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKGZ1bmN0aW9uIChzdWJzY3JpYmVyKSB7XG4gICAgICAgIHZhciBzdWIgPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gICAgICAgIHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgc3ViLmFkZChzY2hlZHVsZXIuc2NoZWR1bGUoZnVuY3Rpb24gKCkgeyByZXR1cm4gc3Vic2NyaWJlci5jb21wbGV0ZSgpOyB9KSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHN1YnNjcmliZXIuZXJyb3IoZXJyKTsgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHN1YjtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNjaGVkdWxlUHJvbWlzZS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX1N1YnNjcmlwdGlvbixfc3ltYm9sX2l0ZXJhdG9yIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4uL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuZXhwb3J0IGZ1bmN0aW9uIHNjaGVkdWxlSXRlcmFibGUoaW5wdXQsIHNjaGVkdWxlcikge1xuICAgIGlmICghaW5wdXQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJdGVyYWJsZSBjYW5ub3QgYmUgbnVsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoZnVuY3Rpb24gKHN1YnNjcmliZXIpIHtcbiAgICAgICAgdmFyIHN1YiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcbiAgICAgICAgdmFyIGl0ZXJhdG9yO1xuICAgICAgICBzdWIuYWRkKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChpdGVyYXRvciAmJiB0eXBlb2YgaXRlcmF0b3IucmV0dXJuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgaXRlcmF0b3IucmV0dXJuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBzdWIuYWRkKHNjaGVkdWxlci5zY2hlZHVsZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRvciA9IGlucHV0W1N5bWJvbF9pdGVyYXRvcl0oKTtcbiAgICAgICAgICAgIHN1Yi5hZGQoc2NoZWR1bGVyLnNjaGVkdWxlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaWJlci5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICAgICAgdmFyIGRvbmU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIGRvbmUgPSByZXN1bHQuZG9uZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpYmVyLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaWJlci5uZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2NoZWR1bGVJdGVyYWJsZS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX3N5bWJvbF9vYnNlcnZhYmxlIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IG9ic2VydmFibGUgYXMgU3ltYm9sX29ic2VydmFibGUgfSBmcm9tICcuLi9zeW1ib2wvb2JzZXJ2YWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dCAmJiB0eXBlb2YgaW5wdXRbU3ltYm9sX29ic2VydmFibGVdID09PSAnZnVuY3Rpb24nO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNJbnRlcm9wT2JzZXJ2YWJsZS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX3N5bWJvbF9pdGVyYXRvciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBpdGVyYXRvciBhcyBTeW1ib2xfaXRlcmF0b3IgfSBmcm9tICcuLi9zeW1ib2wvaXRlcmF0b3InO1xuZXhwb3J0IGZ1bmN0aW9uIGlzSXRlcmFibGUoaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQgJiYgdHlwZW9mIGlucHV0W1N5bWJvbF9pdGVyYXRvcl0gPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0l0ZXJhYmxlLmpzLm1hcFxuIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfc2NoZWR1bGVPYnNlcnZhYmxlLF9zY2hlZHVsZVByb21pc2UsX3NjaGVkdWxlQXJyYXksX3NjaGVkdWxlSXRlcmFibGUsX3V0aWxfaXNJbnRlcm9wT2JzZXJ2YWJsZSxfdXRpbF9pc1Byb21pc2UsX3V0aWxfaXNBcnJheUxpa2UsX3V0aWxfaXNJdGVyYWJsZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBzY2hlZHVsZU9ic2VydmFibGUgfSBmcm9tICcuL3NjaGVkdWxlT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBzY2hlZHVsZVByb21pc2UgfSBmcm9tICcuL3NjaGVkdWxlUHJvbWlzZSc7XG5pbXBvcnQgeyBzY2hlZHVsZUFycmF5IH0gZnJvbSAnLi9zY2hlZHVsZUFycmF5JztcbmltcG9ydCB7IHNjaGVkdWxlSXRlcmFibGUgfSBmcm9tICcuL3NjaGVkdWxlSXRlcmFibGUnO1xuaW1wb3J0IHsgaXNJbnRlcm9wT2JzZXJ2YWJsZSB9IGZyb20gJy4uL3V0aWwvaXNJbnRlcm9wT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBpc1Byb21pc2UgfSBmcm9tICcuLi91dGlsL2lzUHJvbWlzZSc7XG5pbXBvcnQgeyBpc0FycmF5TGlrZSB9IGZyb20gJy4uL3V0aWwvaXNBcnJheUxpa2UnO1xuaW1wb3J0IHsgaXNJdGVyYWJsZSB9IGZyb20gJy4uL3V0aWwvaXNJdGVyYWJsZSc7XG5leHBvcnQgZnVuY3Rpb24gc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoaW5wdXQgIT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNJbnRlcm9wT2JzZXJ2YWJsZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZU9ic2VydmFibGUoaW5wdXQsIHNjaGVkdWxlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNQcm9taXNlKGlucHV0KSkge1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVkdWxlUHJvbWlzZShpbnB1dCwgc2NoZWR1bGVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0FycmF5TGlrZShpbnB1dCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUFycmF5KGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzSXRlcmFibGUoaW5wdXQpIHx8IHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2hlZHVsZUl0ZXJhYmxlKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKGlucHV0ICE9PSBudWxsICYmIHR5cGVvZiBpbnB1dCB8fCBpbnB1dCkgKyAnIGlzIG5vdCBvYnNlcnZhYmxlJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zY2hlZHVsZWQuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9PYnNlcnZhYmxlLF91dGlsX3N1YnNjcmliZVRvLF9zY2hlZHVsZWRfc2NoZWR1bGVkIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IHN1YnNjcmliZVRvIH0gZnJvbSAnLi4vdXRpbC9zdWJzY3JpYmVUbyc7XG5pbXBvcnQgeyBzY2hlZHVsZWQgfSBmcm9tICcuLi9zY2hlZHVsZWQvc2NoZWR1bGVkJztcbmV4cG9ydCBmdW5jdGlvbiBmcm9tKGlucHV0LCBzY2hlZHVsZXIpIHtcbiAgICBpZiAoIXNjaGVkdWxlcikge1xuICAgICAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5wdXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZVRvKGlucHV0KSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gc2NoZWR1bGVkKGlucHV0LCBzY2hlZHVsZXIpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWZyb20uanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9TdWJzY3JpYmVyLF9PYnNlcnZhYmxlLF91dGlsX3N1YnNjcmliZVRvIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi9TdWJzY3JpYmVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuL09ic2VydmFibGUnO1xuaW1wb3J0IHsgc3Vic2NyaWJlVG8gfSBmcm9tICcuL3V0aWwvc3Vic2NyaWJlVG8nO1xudmFyIFNpbXBsZUlubmVyU3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhTaW1wbGVJbm5lclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2ltcGxlSW5uZXJTdWJzY3JpYmVyKHBhcmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2ltcGxlSW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlOZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFNpbXBsZUlubmVyU3Vic2NyaWJlci5wcm90b3R5cGUuX2Vycm9yID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUVycm9yKGVycm9yKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgU2ltcGxlSW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUNvbXBsZXRlKCk7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIHJldHVybiBTaW1wbGVJbm5lclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IFNpbXBsZUlubmVyU3Vic2NyaWJlciB9O1xudmFyIENvbXBsZXhJbm5lclN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQ29tcGxleElubmVyU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb21wbGV4SW5uZXJTdWJzY3JpYmVyKHBhcmVudCwgb3V0ZXJWYWx1ZSwgb3V0ZXJJbmRleCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIF90aGlzLm91dGVyVmFsdWUgPSBvdXRlclZhbHVlO1xuICAgICAgICBfdGhpcy5vdXRlckluZGV4ID0gb3V0ZXJJbmRleDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDb21wbGV4SW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fbmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhcmVudC5ub3RpZnlOZXh0KHRoaXMub3V0ZXJWYWx1ZSwgdmFsdWUsIHRoaXMub3V0ZXJJbmRleCwgdGhpcyk7XG4gICAgfTtcbiAgICBDb21wbGV4SW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fZXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQubm90aWZ5RXJyb3IoZXJyb3IpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBDb21wbGV4SW5uZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lm5vdGlmeUNvbXBsZXRlKHRoaXMpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29tcGxleElubmVyU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgQ29tcGxleElubmVyU3Vic2NyaWJlciB9O1xudmFyIFNpbXBsZU91dGVyU3Vic2NyaWJlciA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICB0c2xpYl8xLl9fZXh0ZW5kcyhTaW1wbGVPdXRlclN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2ltcGxlT3V0ZXJTdWJzY3JpYmVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNpbXBsZU91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5TmV4dCA9IGZ1bmN0aW9uIChpbm5lclZhbHVlKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChpbm5lclZhbHVlKTtcbiAgICB9O1xuICAgIFNpbXBsZU91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uZXJyb3IoZXJyKTtcbiAgICB9O1xuICAgIFNpbXBsZU91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5Q29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICB9O1xuICAgIHJldHVybiBTaW1wbGVPdXRlclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IFNpbXBsZU91dGVyU3Vic2NyaWJlciB9O1xudmFyIENvbXBsZXhPdXRlclN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoQ29tcGxleE91dGVyU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb21wbGV4T3V0ZXJTdWJzY3JpYmVyKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIENvbXBsZXhPdXRlclN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeU5leHQgPSBmdW5jdGlvbiAoX291dGVyVmFsdWUsIGlubmVyVmFsdWUsIF9vdXRlckluZGV4LCBfaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KGlubmVyVmFsdWUpO1xuICAgIH07XG4gICAgQ29tcGxleE91dGVyU3Vic2NyaWJlci5wcm90b3R5cGUubm90aWZ5RXJyb3IgPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnJvcik7XG4gICAgfTtcbiAgICBDb21wbGV4T3V0ZXJTdWJzY3JpYmVyLnByb3RvdHlwZS5ub3RpZnlDb21wbGV0ZSA9IGZ1bmN0aW9uIChfaW5uZXJTdWIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5jb21wbGV0ZSgpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbXBsZXhPdXRlclN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbmV4cG9ydCB7IENvbXBsZXhPdXRlclN1YnNjcmliZXIgfTtcbmV4cG9ydCBmdW5jdGlvbiBpbm5lclN1YnNjcmliZShyZXN1bHQsIGlubmVyU3Vic2NyaWJlcikge1xuICAgIGlmIChpbm5lclN1YnNjcmliZXIuY2xvc2VkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChyZXN1bHQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuc3Vic2NyaWJlKGlubmVyU3Vic2NyaWJlcik7XG4gICAgfVxuICAgIHJldHVybiBzdWJzY3JpYmVUbyhyZXN1bHQpKGlubmVyU3Vic2NyaWJlcik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbm5lclN1YnNjcmliZS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX21hcCxfb2JzZXJ2YWJsZV9mcm9tLF9pbm5lclN1YnNjcmliZSBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi9tYXAnO1xuaW1wb3J0IHsgZnJvbSB9IGZyb20gJy4uL29ic2VydmFibGUvZnJvbSc7XG5pbXBvcnQgeyBTaW1wbGVPdXRlclN1YnNjcmliZXIsIFNpbXBsZUlubmVyU3Vic2NyaWJlciwgaW5uZXJTdWJzY3JpYmUgfSBmcm9tICcuLi9pbm5lclN1YnNjcmliZSc7XG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoTWFwKHByb2plY3QsIHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHNvdXJjZSkgeyByZXR1cm4gc291cmNlLnBpcGUoc3dpdGNoTWFwKGZ1bmN0aW9uIChhLCBpKSB7IHJldHVybiBmcm9tKHByb2plY3QoYSwgaSkpLnBpcGUobWFwKGZ1bmN0aW9uIChiLCBpaSkgeyByZXR1cm4gcmVzdWx0U2VsZWN0b3IoYSwgYiwgaSwgaWkpOyB9KSk7IH0pKTsgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChzb3VyY2UpIHsgcmV0dXJuIHNvdXJjZS5saWZ0KG5ldyBTd2l0Y2hNYXBPcGVyYXRvcihwcm9qZWN0KSk7IH07XG59XG52YXIgU3dpdGNoTWFwT3BlcmF0b3IgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3dpdGNoTWFwT3BlcmF0b3IocHJvamVjdCkge1xuICAgICAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xuICAgIH1cbiAgICBTd2l0Y2hNYXBPcGVyYXRvci5wcm90b3R5cGUuY2FsbCA9IGZ1bmN0aW9uIChzdWJzY3JpYmVyLCBzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUobmV3IFN3aXRjaE1hcFN1YnNjcmliZXIoc3Vic2NyaWJlciwgdGhpcy5wcm9qZWN0KSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3dpdGNoTWFwT3BlcmF0b3I7XG59KCkpO1xudmFyIFN3aXRjaE1hcFN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoU3dpdGNoTWFwU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTd2l0Y2hNYXBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uLCBwcm9qZWN0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIGRlc3RpbmF0aW9uKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgX3RoaXMuaW5kZXggPSAwO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN3aXRjaE1hcFN1YnNjcmliZXIucHJvdG90eXBlLl9uZXh0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaW5kZXgrKztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJvamVjdCh2YWx1ZSwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faW5uZXJTdWIocmVzdWx0KTtcbiAgICB9O1xuICAgIFN3aXRjaE1hcFN1YnNjcmliZXIucHJvdG90eXBlLl9pbm5lclN1YiA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgdmFyIGlubmVyU3Vic2NyaXB0aW9uID0gdGhpcy5pbm5lclN1YnNjcmlwdGlvbjtcbiAgICAgICAgaWYgKGlubmVyU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBpbm5lclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbm5lclN1YnNjcmliZXIgPSBuZXcgU2ltcGxlSW5uZXJTdWJzY3JpYmVyKHRoaXMpO1xuICAgICAgICB2YXIgZGVzdGluYXRpb24gPSB0aGlzLmRlc3RpbmF0aW9uO1xuICAgICAgICBkZXN0aW5hdGlvbi5hZGQoaW5uZXJTdWJzY3JpYmVyKTtcbiAgICAgICAgdGhpcy5pbm5lclN1YnNjcmlwdGlvbiA9IGlubmVyU3Vic2NyaWJlKHJlc3VsdCwgaW5uZXJTdWJzY3JpYmVyKTtcbiAgICAgICAgaWYgKHRoaXMuaW5uZXJTdWJzY3JpcHRpb24gIT09IGlubmVyU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgZGVzdGluYXRpb24uYWRkKHRoaXMuaW5uZXJTdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTd2l0Y2hNYXBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbm5lclN1YnNjcmlwdGlvbiA9IHRoaXMuaW5uZXJTdWJzY3JpcHRpb247XG4gICAgICAgIGlmICghaW5uZXJTdWJzY3JpcHRpb24gfHwgaW5uZXJTdWJzY3JpcHRpb24uY2xvc2VkKSB7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLl9jb21wbGV0ZS5jYWxsKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIFN3aXRjaE1hcFN1YnNjcmliZXIucHJvdG90eXBlLl91bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbm5lclN1YnNjcmlwdGlvbiA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIFN3aXRjaE1hcFN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeUNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlubmVyU3Vic2NyaXB0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUuX2NvbXBsZXRlLmNhbGwodGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN3aXRjaE1hcFN1YnNjcmliZXIucHJvdG90eXBlLm5vdGlmeU5leHQgPSBmdW5jdGlvbiAoaW5uZXJWYWx1ZSkge1xuICAgICAgICB0aGlzLmRlc3RpbmF0aW9uLm5leHQoaW5uZXJWYWx1ZSk7XG4gICAgfTtcbiAgICByZXR1cm4gU3dpdGNoTWFwU3Vic2NyaWJlcjtcbn0oU2ltcGxlT3V0ZXJTdWJzY3JpYmVyKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1zd2l0Y2hNYXAuanMubWFwXG4iLCI8c2NyaXB0PlxuICBpbXBvcnQgeyBjcmVhdGVFdmVudERpc3BhdGNoZXIsIG9uTW91bnQsIGdldENvbnRleHQsIHRpY2sgfSBmcm9tICdzdmVsdGUnXG4gIGltcG9ydCB7IG9taXQsIGdldEV2ZW50c0FjdGlvbiB9IGZyb20gJy4uL3V0aWxzJ1xuICBpbXBvcnQgeyBjdXJyZW50X2NvbXBvbmVudCB9IGZyb20gJ3N2ZWx0ZS9pbnRlcm5hbCdcblx0XG4gIGltcG9ydCBJY29uIGZyb20gJy4vSWNvbi5zdmVsdGUnXG5cbiAgLyoqIEJpbmRpbmcgdmFsdWVcbiAgICogQHN2ZWx0ZS1wcm9wIHtTdHJpbmd8TnVtYmVyfSBbdmFsdWVdXG4gICAqICovXG4gIGV4cG9ydCBsZXQgdmFsdWUgPSAnJ1xuXG4gIC8qKiBJbnB1dCB0eXBlLCBvciA8Y29kZT50ZXh0YXJlYTwvY29kZT5cbiAgICogQHN2ZWx0ZS1wcm9wIHtTdHJpbmd9IFt0eXBlPXRleHRdXG4gICAqIEB2YWx1ZXMgQW55IG5hdGl2ZSB0eXBlLCA8Y29kZT50ZXh0YXJlYTwvY29kZT5cbiAgICogKi9cbiAgZXhwb3J0IGxldCB0eXBlID0gJ3RleHQnXG5cbiAgLyoqIFNpemUgb2YgaW5wdXRcbiAgICogQHN2ZWx0ZS1wcm9wIHtTdHJpbmd9IFtzaXplXVxuICAgKiBAdmFsdWVzICQkc2l6ZXMkJFxuICAgKiAqL1xuICBleHBvcnQgbGV0IHNpemUgPSAnJ1xuXG4gIC8qKiBNYWtlcyBpbnB1dCBmdWxsLXdpZHRoIHdoZW4gaW5zaWRlIGEgZ3JvdXBlZCBvciBhZGRvbiBmaWVsZFxuICAgKiBAc3ZlbHRlLXByb3Age2Jvb2xlYW59IGV4cGFuZGVkPWZhbHNlXG4gICAqICovXG4gIGV4cG9ydCBsZXQgZXhwYW5kZWQgPSBmYWxzZVxuXG4gIC8qKiBTaG93IHRoZSBwYXNzd29yZCByZXZlYWwgdG9nZ2xlIGJ1dHRvblxuICAgKiBAc3ZlbHRlLXByb3Age2Jvb2xlYW59IHBhc3N3b3JkUmV2ZWFsPWZhbHNlXG4gICAqICovXG4gIGV4cG9ydCBsZXQgcGFzc3dvcmRSZXZlYWwgPSBmYWxzZVxuXG4gIC8qKiBTZXQgaW5wdXQgbWF4bGVuZ3RoIGFuZCBzaG93IGEgY291bnRlclxuICAgKiBAc3ZlbHRlLXByb3Age051bWJlcn0gW21heGxlbmd0aF1cbiAgICogKi9cbiAgZXhwb3J0IGxldCBtYXhsZW5ndGggPSBudWxsXG5cbiAgLyoqIFNob3cgdGhlIGNoYXJhY3RlciBjb3VudGVyIHdoZW4gPGNvZGU+bWF4bGVuZ3RoPGNvZGU+IGlzIHNldFxuICAgKiBAc3ZlbHRlLXByb3Age2Jvb2xlYW59IFtoYXNDb3VudGVyPXRydWVdXG4gICAqICovXG4gIGV4cG9ydCBsZXQgaGFzQ291bnRlciA9IHRydWVcblxuICAvKiogU2hvdyBsb2FkaW5nIGluZGljYXRvclxuICAgKiBAc3ZlbHRlLXByb3Age2Jvb2xlYW59IFtsb2FkaW5nPWZhbHNlXVxuICAgKiAqL1xuICBleHBvcnQgbGV0IGxvYWRpbmcgPSBmYWxzZVxuXG4gIC8qKiBTaG93IHRoaXMgaWNvbiBvbiBsZWZ0IHNpZGUgb2YgaW5wdXRcbiAgICogQHN2ZWx0ZS1wcm9wIHtTdHJpbmd9IFtpY29uXVxuICAgKiAqL1xuICBleHBvcnQgbGV0IGljb24gPSAnJ1xuXG4gIC8qKiBGb250YXdlc29tZSBpY29uIHBhY2sgdG8gdXNlLiBCeSBkZWZhdWx0IHRoZSA8Y29kZT5JY29uPC9jb2RlPiBjb21wb25lbnQgdXNlcyA8Y29kZT5mYXM8L2NvZGU+XG4gICAqIEBzdmVsdGUtcHJvcCB7U3RyaW5nfSBbaWNvblBhY2tdXG4gICAqIEB2YWx1ZXMgPGNvZGU+ZmFzPC9jb2RlPiwgPGNvZGU+ZmFiPC9jb2RlPiwgZXRjLi4uXG4gICAqICovXG4gIGV4cG9ydCBsZXQgaWNvblBhY2sgPSAnJ1xuXG4gIC8qKiBJbnB1dCBpcyBkaXNhYmxlZFxuICAgKiBAc3ZlbHRlLXByb3Age2Jvb2xlYW59IFtkaXNhYmxlZD1mYWxzZV1cbiAgICogKi9cbiAgZXhwb3J0IGxldCBkaXNhYmxlZCA9IGZhbHNlXG5cbiAgbGV0IGlucHV0XG4gIGxldCBpc0ZvY3VzZWRcbiAgbGV0IGlzUGFzc3dvcmRWaXNpYmxlID0gZmFsc2VcbiAgbGV0IG5ld1R5cGUgPSAndGV4dCdcbiAgbGV0IHN0YXR1c1R5cGUgPSAnJ1xuICBsZXQgc3RhdHVzVHlwZUljb24gPSAnJ1xuICBsZXQgdmFsdWVMZW5ndGggPSBudWxsXG5cbiAgY29uc3QgZGlzcGF0Y2ggPSBjcmVhdGVFdmVudERpc3BhdGNoZXIoKTtcblxuICBjb25zdCBnZXRUeXBlID0gZ2V0Q29udGV4dCgndHlwZScpXG4gIGlmIChnZXRUeXBlKSBzdGF0dXNUeXBlID0gZ2V0VHlwZSgpIHx8ICcnXG5cbiAgJDogcHJvcHMgPSB7XG4gICAgLi4ub21pdCgkJHByb3BzLCAnY2xhc3MnLCAndmFsdWUnLCAndHlwZScsICdzaXplJywgJ3Bhc3N3b3JkUmV2ZWFsJywgJ2hhc0NvdW50ZXInLCAnbG9hZGluZycsICdkaXNhYmxlZCcpLFxuICB9XG4gICQ6IGhhc0ljb25MZWZ0ID0gISFpY29uXG4gICQ6IGhhc0ljb25SaWdodCA9IHBhc3N3b3JkUmV2ZWFsIHx8IGxvYWRpbmcgfHwgc3RhdHVzVHlwZVxuICAkOiBwYXNzd29yZFZpc2libGVJY29uID0gaXNQYXNzd29yZFZpc2libGUgPyAnZXllLXNsYXNoJyA6ICdleWUnXG4gICQ6IHtcbiAgICBzd2l0Y2ggKHN0YXR1c1R5cGUpIHtcbiAgICAgIGNhc2UgJ2lzLXN1Y2Nlc3MnOlxuICAgICAgICBzdGF0dXNUeXBlSWNvbiA9ICdjaGVjaydcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2lzLWRhbmdlcic6XG4gICAgICAgIHN0YXR1c1R5cGVJY29uID0gJ2V4Y2xhbWF0aW9uLWNpcmNsZSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2lzLWluZm8nOlxuICAgICAgICBzdGF0dXNUeXBlSWNvbiA9ICdpbmZvLWNpcmNsZSdcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2lzLXdhcm5pbmcnOlxuICAgICAgICBzdGF0dXNUeXBlSWNvbiA9ICdleGNsYW1hdGlvbi10cmlhbmdsZSdcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgJDoge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZUxlbmd0aCA9IHZhbHVlLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgdmFsdWVMZW5ndGggPSB2YWx1ZS50b1N0cmluZygpLmxlbmd0aFxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZUxlbmd0aCA9IDBcbiAgICB9XG4gIH1cblxuICBvbk1vdW50KCgpID0+IHtcbiAgICBuZXdUeXBlID0gdHlwZVxuICB9KVxuXG4gIGFzeW5jIGZ1bmN0aW9uIHRvZ2dsZVBhc3N3b3JkVmlzaWJpbGl0eSgpIHtcbiAgICBpc1Bhc3N3b3JkVmlzaWJsZSA9ICFpc1Bhc3N3b3JkVmlzaWJsZVxuICAgIG5ld1R5cGUgPSBpc1Bhc3N3b3JkVmlzaWJsZSA/ICd0ZXh0JyA6ICdwYXNzd29yZCdcbiAgICBhd2FpdCB0aWNrKClcbiAgICBpbnB1dC5mb2N1cygpXG4gIH1cblxuICBjb25zdCBvbklucHV0ID0gZSA9PiB7XG4gICAgdmFsdWUgPSBlLnRhcmdldC52YWx1ZVxuICAgICQkcHJvcHMudmFsdWUgPSB2YWx1ZVxuXG4gICAgZGlzcGF0Y2goJ2lucHV0JywgZSlcbiAgfVxuICBjb25zdCBvbkZvY3VzID0gKCkgPT4gKGlzRm9jdXNlZCA9IHRydWUpXG4gIGNvbnN0IG9uQmx1ciA9ICgpID0+IChpc0ZvY3VzZWQgPSBmYWxzZSlcblxuICBjb25zdCBldmVudHMgPSBnZXRFdmVudHNBY3Rpb24oY3VycmVudF9jb21wb25lbnQpO1xuPC9zY3JpcHQ+XG5cbjxzdHlsZT5cbiAgLmNvbnRyb2wgLmhlbHAuY291bnRlciB7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIG1hcmdpbi1sZWZ0OiAwLjVlbTtcbiAgfVxuPC9zdHlsZT5cblxuPGRpdiBjbGFzcz1cImNvbnRyb2xcIiBjbGFzczpoYXMtaWNvbnMtbGVmdD17aGFzSWNvbkxlZnR9IGNsYXNzOmhhcy1pY29ucy1yaWdodD17aGFzSWNvblJpZ2h0fSBjbGFzczppcy1sb2FkaW5nPXtsb2FkaW5nfSBjbGFzczppcy1leHBhbmRlZD17ZXhwYW5kZWR9PlxuXG4gIHsjaWYgdHlwZSAhPT0gJ3RleHRhcmVhJ31cbiAgICA8aW5wdXRcbiAgICAgIHVzZTpldmVudHNcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHR5cGU9e25ld1R5cGV9XG4gICAgICB7dmFsdWV9XG4gICAgICBjbGFzcz1cImlucHV0IHtzdGF0dXNUeXBlfSB7c2l6ZX0geyQkcHJvcHMuY2xhc3MgfHwgJyd9XCJcbiAgICAgIGJpbmQ6dGhpcz17aW5wdXR9XG4gICAgICBvbjppbnB1dD17b25JbnB1dH1cbiAgICAgIG9uOmZvY3VzPXtvbkZvY3VzfVxuICAgICAgb246Ymx1cj17b25CbHVyfVxuICAgICAgb246Y2hhbmdlXG4gICAgICB7ZGlzYWJsZWR9IC8+XG4gIHs6ZWxzZX1cbiAgICA8dGV4dGFyZWFcbiAgICAgIHVzZTpldmVudHNcbiAgICAgIHsuLi5wcm9wc31cbiAgICAgIHt2YWx1ZX1cbiAgICAgIGNsYXNzPVwidGV4dGFyZWEge3N0YXR1c1R5cGV9XG4gICAgICB7c2l6ZX1cIlxuICAgICAgYmluZDp0aGlzPXtpbnB1dH1cbiAgICAgIG9uOmlucHV0PXtvbklucHV0fVxuICAgICAgb246Zm9jdXM9e29uRm9jdXN9XG4gICAgICBvbjpibHVyPXtvbkJsdXJ9XG4gICAgICBvbjpjaGFuZ2VcbiAgICAgIHtkaXNhYmxlZH0gLz5cbiAgey9pZn1cblxuICB7I2lmIGljb259XG4gICAgPEljb25cbiAgICAgIHBhY2s9e2ljb25QYWNrfVxuICAgICAgaXNMZWZ0PXt0cnVlfVxuICAgICAge2ljb259IC8+XG4gIHsvaWZ9XG5cbiAgeyNpZiAhbG9hZGluZyAmJiAocGFzc3dvcmRSZXZlYWwgfHwgc3RhdHVzVHlwZSl9XG4gICAgPCEtLSBwYWNrPXtpY29uUGFja31cbiAgICBzaXplPXtpY29uU2l6ZX0gLS0+XG4gICAgPEljb25cbiAgICAgIHBhY2s9XCJmYXNcIlxuICAgICAgaXNSaWdodD17dHJ1ZX1cbiAgICAgIGlzQ2xpY2thYmxlPXtwYXNzd29yZFJldmVhbH1cbiAgICAgIGljb249e3Bhc3N3b3JkUmV2ZWFsID8gcGFzc3dvcmRWaXNpYmxlSWNvbiA6IHN0YXR1c1R5cGVJY29ufVxuICAgICAgdHlwZT17IXBhc3N3b3JkUmV2ZWFsID8gc3RhdHVzVHlwZSA6ICdpcy1wcmltYXJ5J31cbiAgICAgIG9uOmNsaWNrPXt0b2dnbGVQYXNzd29yZFZpc2liaWxpdHl9IC8+XG4gIHsvaWZ9XG5cbiAgeyNpZiBtYXhsZW5ndGggJiYgaGFzQ291bnRlciAmJiB0eXBlICE9PSAnbnVtYmVyJ31cbiAgICA8c21hbGwgY2xhc3M9XCJoZWxwIGNvdW50ZXJcIiBjbGFzczppcy1pbnZpc2libGU9eyFpc0ZvY3VzZWR9Pnt2YWx1ZUxlbmd0aH0gLyB7bWF4bGVuZ3RofTwvc21hbGw+XG4gIHsvaWZ9XG48L2Rpdj5cbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuIEluIHRoZSBicm93c2VyIHdlIHRoZXJlZm9yZVxuLy8gcmVxdWlyZSB0aGUgY3J5cHRvIEFQSSBhbmQgZG8gbm90IHN1cHBvcnQgYnVpbHQtaW4gZmFsbGJhY2sgdG8gbG93ZXIgcXVhbGl0eSByYW5kb20gbnVtYmVyXG4vLyBnZW5lcmF0b3JzIChsaWtlIE1hdGgucmFuZG9tKCkpLlxudmFyIGdldFJhbmRvbVZhbHVlcztcbnZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJuZygpIHtcbiAgLy8gbGF6eSBsb2FkIHNvIHRoYXQgZW52aXJvbm1lbnRzIHRoYXQgbmVlZCB0byBwb2x5ZmlsbCBoYXZlIGEgY2hhbmNlIHRvIGRvIHNvXG4gIGlmICghZ2V0UmFuZG9tVmFsdWVzKSB7XG4gICAgLy8gZ2V0UmFuZG9tVmFsdWVzIG5lZWRzIHRvIGJlIGludm9rZWQgaW4gYSBjb250ZXh0IHdoZXJlIFwidGhpc1wiIGlzIGEgQ3J5cHRvIGltcGxlbWVudGF0aW9uLiBBbHNvLFxuICAgIC8vIGZpbmQgdGhlIGNvbXBsZXRlIGltcGxlbWVudGF0aW9uIG9mIGNyeXB0byAobXNDcnlwdG8pIG9uIElFMTEuXG4gICAgZ2V0UmFuZG9tVmFsdWVzID0gdHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQoY3J5cHRvKSB8fCB0eXBlb2YgbXNDcnlwdG8gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiYgbXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzLmJpbmQobXNDcnlwdG8pO1xuXG4gICAgaWYgKCFnZXRSYW5kb21WYWx1ZXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignY3J5cHRvLmdldFJhbmRvbVZhbHVlcygpIG5vdCBzdXBwb3J0ZWQuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQjZ2V0cmFuZG9tdmFsdWVzLW5vdC1zdXBwb3J0ZWQnKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbn0iLCJleHBvcnQgZGVmYXVsdCAvXig/OlswLTlhLWZdezh9LVswLTlhLWZdezR9LVsxLTVdWzAtOWEtZl17M30tWzg5YWJdWzAtOWEtZl17M30tWzAtOWEtZl17MTJ9fDAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCkkL2k7IiwiaW1wb3J0IFJFR0VYIGZyb20gJy4vcmVnZXguanMnO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZSh1dWlkKSB7XG4gIHJldHVybiB0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycgJiYgUkVHRVgudGVzdCh1dWlkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdmFsaWRhdGU7IiwiaW1wb3J0IHZhbGlkYXRlIGZyb20gJy4vdmFsaWRhdGUuanMnO1xuLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG5cbnZhciBieXRlVG9IZXggPSBbXTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXgucHVzaCgoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpKTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGFycikge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAwO1xuICAvLyBOb3RlOiBCZSBjYXJlZnVsIGVkaXRpbmcgdGhpcyBjb2RlISAgSXQncyBiZWVuIHR1bmVkIGZvciBwZXJmb3JtYW5jZVxuICAvLyBhbmQgd29ya3MgaW4gd2F5cyB5b3UgbWF5IG5vdCBleHBlY3QuIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdXVpZGpzL3V1aWQvcHVsbC80MzRcbiAgdmFyIHV1aWQgPSAoYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDFdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgMl1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyAzXV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDRdXSArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgNV1dICsgJy0nICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA2XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDddXSArICctJyArIGJ5dGVUb0hleFthcnJbb2Zmc2V0ICsgOF1dICsgYnl0ZVRvSGV4W2FycltvZmZzZXQgKyA5XV0gKyAnLScgKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEwXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDExXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEyXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDEzXV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE0XV0gKyBieXRlVG9IZXhbYXJyW29mZnNldCArIDE1XV0pLnRvTG93ZXJDYXNlKCk7IC8vIENvbnNpc3RlbmN5IGNoZWNrIGZvciB2YWxpZCBVVUlELiAgSWYgdGhpcyB0aHJvd3MsIGl0J3MgbGlrZWx5IGR1ZSB0byBvbmVcbiAgLy8gb2YgdGhlIGZvbGxvd2luZzpcbiAgLy8gLSBPbmUgb3IgbW9yZSBpbnB1dCBhcnJheSB2YWx1ZXMgZG9uJ3QgbWFwIHRvIGEgaGV4IG9jdGV0IChsZWFkaW5nIHRvXG4gIC8vIFwidW5kZWZpbmVkXCIgaW4gdGhlIHV1aWQpXG4gIC8vIC0gSW52YWxpZCBpbnB1dCB2YWx1ZXMgZm9yIHRoZSBSRkMgYHZlcnNpb25gIG9yIGB2YXJpYW50YCBmaWVsZHNcblxuICBpZiAoIXZhbGlkYXRlKHV1aWQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdTdHJpbmdpZmllZCBVVUlEIGlzIGludmFsaWQnKTtcbiAgfVxuXG4gIHJldHVybiB1dWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBzdHJpbmdpZnk7IiwiaW1wb3J0IHJuZyBmcm9tICcuL3JuZy5qcyc7XG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5LmpzJztcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTsgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuXG4gIHJuZHNbNl0gPSBybmRzWzZdICYgMHgwZiB8IDB4NDA7XG4gIHJuZHNbOF0gPSBybmRzWzhdICYgMHgzZiB8IDB4ODA7IC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuXG4gIGlmIChidWYpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfHwgMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTY7ICsraSkge1xuICAgICAgYnVmW29mZnNldCArIGldID0gcm5kc1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYnVmO1xuICB9XG5cbiAgcmV0dXJuIHN0cmluZ2lmeShybmRzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdjQ7IiwiPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbiAgaW1wb3J0IHsgaW50ZXJ2YWwgfSBmcm9tICdyeGpzJ1xuICBpbXBvcnQgSW5wdXQgZnJvbSAnc3ZlbG1hL3NyYy9jb21wb25lbnRzL0lucHV0LnN2ZWx0ZSdcbiAgaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnQC9zdG9yZS9BcG9sbG9DbGllbnRTdG9yZSdcbiAgaW1wb3J0IHsgZmlsdGVyLCBtYXAsIHN3aXRjaE1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG4gIGltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1ib29zdCdcbiAgaW1wb3J0IHsgdjQgYXMgdXVpZFY0IH0gZnJvbSAndXVpZCdcbiAgaW1wb3J0IHsgZmxhdE1hcCB9IGZyb20gJ3J4anMvaW50ZXJuYWwvb3BlcmF0b3JzJ1xuICBpbXBvcnQgdHlwZSB7IE1lc3NhZ2UgfSBmcm9tICdAL21vZGVsL0NoYXQnXG5cbiAgbGV0IG1lc3NhZ2VzOiBzdHJpbmcgPSAnJ1xuICBsZXQgbGFzdE1lc3NhZ2VzOiBzdHJpbmcgPSAnJ1xuICBsZXQgbWVzc2FnZUxpc3Q6IHN0cmluZ1tdID0gW11cbiAgY29uc3QgdXVpZCA9IHV1aWRWNCgpXG5cbiAgY29uc3QgcHVibGlzaE1lc3NhZ2VRdWVyeSA9ICh0b3BpYzogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgICByZXR1cm4gZ3FsYFxuICAgICAgbXV0YXRpb24ge1xuICAgICAgICBwdWJsaXNoTWVzc2FnZSh0b3BpYzogXCIke3RvcGljfVwiLCBtZXNzYWdlOiBcIiR7bWVzc2FnZX1cIilcbiAgICAgIH1cbiAgICBgXG4gIH1cblxuICBjb25zdCBzdWJzY3JpcHRpb25NZXNzYWdlcyA9ICh0b3BpYzogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGdxbGBcbiAgICAgIHN1YnNjcmlwdGlvbiB7XG4gICAgICAgIHN1YnNjcmlwdGlvbk1lc3NhZ2UodG9waWM6IFwiJHt0b3BpY31cIikge1xuICAgICAgICAgIHRleHRcbiAgICAgICAgICBjcmVhdGVkQXRcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGBcbiAgfVxuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGluc2VydE1lc3NhZ2VPYnNlcnZlcigpXG4gICAgc3Vic2NyaWJlTWVzc2FnZSgpXG4gIH0pXG5cbiAgZnVuY3Rpb24gaW5zZXJ0TWVzc2FnZU9ic2VydmVyKCkge1xuICAgIGludGVydmFsKDEwMDApXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKCgpID0+IGxhc3RNZXNzYWdlcyAhPT0gbWVzc2FnZXMpLFxuICAgICAgICB0YXAoKCkgPT4gbGFzdE1lc3NhZ2VzID0gbWVzc2FnZXMpLFxuICAgICAgICBtYXAoKCkgPT4gY2xpZW50LmdldCgpKSxcbiAgICAgICAgZmxhdE1hcCgoYXBvbGxvKSA9PlxuICAgICAgICAgIGFwb2xsby5tdXRhdGUoeyBtdXRhdGlvbjogcHVibGlzaE1lc3NhZ2VRdWVyeSh1dWlkLCBsYXN0TWVzc2FnZXMpfSApKVxuICAgICAgKVxuICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2codXVpZClcbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gc3Vic2NyaWJlTWVzc2FnZSgpIHtcbiAgICBjbGllbnQuZ2V0KCkuc3Vic2NyaWJlKHsgcXVlcnk6IHN1YnNjcmlwdGlvbk1lc3NhZ2VzKHV1aWQpIH0pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgY29uc3Qgb2JqID0gcmVzLmRhdGEuc3Vic2NyaXB0aW9uTWVzc2FnZSBhcyBNZXNzYWdlXG4gICAgICBtZXNzYWdlTGlzdC5wdXNoKG9iai50ZXh0KVxuICAgICAgbWVzc2FnZUxpc3QgPSBbLi4ubWVzc2FnZUxpc3RdXG4gICAgfSlcbiAgfVxuPC9zY3JpcHQ+XG5cbjxzdmVsdGU6aGVhZD5cblx0PHRpdGxlPkNoYXQ8L3RpdGxlPlxuPC9zdmVsdGU6aGVhZD5cblxuPGgxPkNoYXQ8L2gxPlxuPGRpdj5cbiAgeyNlYWNoIG1lc3NhZ2VMaXN0IGFzIG1lc3NhZ2V9XG4gIDxkaXY+XG4gICAge21lc3NhZ2V9XG4gIDwvZGl2Plxuey9lYWNofVxuPC9kaXY+XG48SW5wdXQgYmluZDp2YWx1ZT17bWVzc2FnZXN9IC8+XG4iXSwibmFtZXMiOlsiaXRlcmF0b3IiLCJTeW1ib2xfaXRlcmF0b3IiLCJTeW1ib2xfb2JzZXJ2YWJsZSIsIm9ic2VydmFibGUiLCJ0c2xpYl8xLl9fZXh0ZW5kcyIsInV1aWRWNCIsImdxbCIsImZsYXRNYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNPLElBQUksZ0JBQWdCLEdBQUcsVUFBVSxLQUFLLEVBQUU7QUFDL0MsSUFBSSxPQUFPLFVBQVUsVUFBVSxFQUFFO0FBQ2pDLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUs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QUMsRUFBRTtBQUM5QixFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBQ0Q7QUFDQSxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDeEIsRUFBRSxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckY7QUFDQTtBQUNBLEVBQUUsSUFBSSxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FB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
