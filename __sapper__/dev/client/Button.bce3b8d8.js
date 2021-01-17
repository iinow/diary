import './_rollup-plugin-inject-process-env.d2a692b0.js';
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, y as globals, v as validate_slots, z as onMount, A as assign, B as exclude_internal_props, C as empty, n as insert_dev, D as group_outros, u as transition_out, E as check_outros, r as transition_in, b as detach_dev, F as bubble, G as create_slot, c as create_component, k as claim_component, p as mount_component, x as destroy_component, e as element, a as space, g as claim_element, h as children, f as claim_space, m as add_location, H as set_attributes, I as toggle_class, o as append_dev, J as listen_dev, K as update_slot, L as get_spread_update } from './client.c2574e4a.js';
import { I as Icon, o as omit } from './index.be0e0d90.js';

const { Error: Error_1 } = globals;
const file = "node_modules/svelma/src/components/Button.svelte";

// (85:22) 
function create_if_block_3(ctx) {
	let a;
	let t0;
	let span;
	let t1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*iconLeft*/ ctx[7] && create_if_block_5(ctx);
	const default_slot_template = /*#slots*/ ctx[15].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);
	let if_block1 = /*iconRight*/ ctx[8] && create_if_block_4(ctx);
	let a_levels = [{ href: /*href*/ ctx[1] }, /*props*/ ctx[11]];
	let a_data = {};

	for (let i = 0; i < a_levels.length; i += 1) {
		a_data = assign(a_data, a_levels[i]);
	}

	const block = {
		c: function create() {
			a = element("a");
			if (if_block0) if_block0.c();
			t0 = space();
			span = element("span");
			if (default_slot) default_slot.c();
			t1 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { href: true });
			var a_nodes = children(a);
			if (if_block0) if_block0.l(a_nodes);
			t0 = claim_space(a_nodes);
			span = claim_element(a_nodes, "SPAN", {});
			var span_nodes = children(span);
			if (default_slot) default_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			t1 = claim_space(a_nodes);
			if (if_block1) if_block1.l(a_nodes);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file, 96, 4, 2314);
			set_attributes(a, a_data);
			toggle_class(a, "is-inverted", /*inverted*/ ctx[4]);
			toggle_class(a, "is-loading", /*loading*/ ctx[3]);
			toggle_class(a, "is-outlined", /*outlined*/ ctx[5]);
			toggle_class(a, "is-rounded", /*rounded*/ ctx[6]);
			add_location(a, file, 85, 2, 2047);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			if (if_block0) if_block0.m(a, null);
			append_dev(a, t0);
			append_dev(a, span);

			if (default_slot) {
				default_slot.m(span, null);
			}

			append_dev(a, t1);
			if (if_block1) if_block1.m(a, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(a, "click", /*click_handler_1*/ ctx[17], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*iconLeft*/ ctx[7]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*iconLeft*/ 128) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_5(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(a, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 16384) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[14], dirty, null, null);
				}
			}

			if (/*iconRight*/ ctx[8]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*iconRight*/ 256) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_4(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(a, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			set_attributes(a, a_data = get_spread_update(a_levels, [
				(!current || dirty & /*href*/ 2) && { href: /*href*/ ctx[1] },
				dirty & /*props*/ 2048 && /*props*/ ctx[11]
			]));

			toggle_class(a, "is-inverted", /*inverted*/ ctx[4]);
			toggle_class(a, "is-loading", /*loading*/ ctx[3]);
			toggle_class(a, "is-outlined", /*outlined*/ ctx[5]);
			toggle_class(a, "is-rounded", /*rounded*/ ctx[6]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(default_slot, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(default_slot, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
			if (if_block0) if_block0.d();
			if (default_slot) default_slot.d(detaching);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(85:22) ",
		ctx
	});

	return block;
}

// (66:0) {#if tag === 'button'}
function create_if_block(ctx) {
	let button;
	let t0;
	let span;
	let t1;
	let current;
	let mounted;
	let dispose;
	let if_block0 = /*iconLeft*/ ctx[7] && create_if_block_2(ctx);
	const default_slot_template = /*#slots*/ ctx[15].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], null);
	let if_block1 = /*iconRight*/ ctx[8] && create_if_block_1(ctx);
	let button_levels = [/*props*/ ctx[11], { type: /*nativeType*/ ctx[2] }];
	let button_data = {};

	for (let i = 0; i < button_levels.length; i += 1) {
		button_data = assign(button_data, button_levels[i]);
	}

	const block = {
		c: function create() {
			button = element("button");
			if (if_block0) if_block0.c();
			t0 = space();
			span = element("span");
			if (default_slot) default_slot.c();
			t1 = space();
			if (if_block1) if_block1.c();
			this.h();
		},
		l: function claim(nodes) {
			button = claim_element(nodes, "BUTTON", { type: true });
			var button_nodes = children(button);
			if (if_block0) if_block0.l(button_nodes);
			t0 = claim_space(button_nodes);
			span = claim_element(button_nodes, "SPAN", {});
			var span_nodes = children(span);
			if (default_slot) default_slot.l(span_nodes);
			span_nodes.forEach(detach_dev);
			t1 = claim_space(button_nodes);
			if (if_block1) if_block1.l(button_nodes);
			button_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file, 77, 4, 1882);
			set_attributes(button, button_data);
			toggle_class(button, "is-inverted", /*inverted*/ ctx[4]);
			toggle_class(button, "is-loading", /*loading*/ ctx[3]);
			toggle_class(button, "is-outlined", /*outlined*/ ctx[5]);
			toggle_class(button, "is-rounded", /*rounded*/ ctx[6]);
			add_location(button, file, 66, 2, 1599);
		},
		m: function mount(target, anchor) {
			insert_dev(target, button, anchor);
			if (if_block0) if_block0.m(button, null);
			append_dev(button, t0);
			append_dev(button, span);

			if (default_slot) {
				default_slot.m(span, null);
			}

			append_dev(button, t1);
			if (if_block1) if_block1.m(button, null);
			current = true;

			if (!mounted) {
				dispose = listen_dev(button, "click", /*click_handler*/ ctx[16], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, dirty) {
			if (/*iconLeft*/ ctx[7]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*iconLeft*/ 128) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_2(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(button, t0);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 16384) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[14], dirty, null, null);
				}
			}

			if (/*iconRight*/ ctx[8]) {
				if (if_block1) {
					if_block1.p(ctx, dirty);

					if (dirty & /*iconRight*/ 256) {
						transition_in(if_block1, 1);
					}
				} else {
					if_block1 = create_if_block_1(ctx);
					if_block1.c();
					transition_in(if_block1, 1);
					if_block1.m(button, null);
				}
			} else if (if_block1) {
				group_outros();

				transition_out(if_block1, 1, 1, () => {
					if_block1 = null;
				});

				check_outros();
			}

			set_attributes(button, button_data = get_spread_update(button_levels, [
				dirty & /*props*/ 2048 && /*props*/ ctx[11],
				(!current || dirty & /*nativeType*/ 4) && { type: /*nativeType*/ ctx[2] }
			]));

			toggle_class(button, "is-inverted", /*inverted*/ ctx[4]);
			toggle_class(button, "is-loading", /*loading*/ ctx[3]);
			toggle_class(button, "is-outlined", /*outlined*/ ctx[5]);
			toggle_class(button, "is-rounded", /*rounded*/ ctx[6]);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			transition_in(default_slot, local);
			transition_in(if_block1);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			transition_out(default_slot, local);
			transition_out(if_block1);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(button);
			if (if_block0) if_block0.d();
			if (default_slot) default_slot.d(detaching);
			if (if_block1) if_block1.d();
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(66:0) {#if tag === 'button'}",
		ctx
	});

	return block;
}

// (94:4) {#if iconLeft}
function create_if_block_5(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				icon: /*iconLeft*/ ctx[7],
				size: /*iconSize*/ ctx[10]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconPack*/ 512) icon_changes.pack = /*iconPack*/ ctx[9];
			if (dirty & /*iconLeft*/ 128) icon_changes.icon = /*iconLeft*/ ctx[7];
			if (dirty & /*iconSize*/ 1024) icon_changes.size = /*iconSize*/ ctx[10];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_5.name,
		type: "if",
		source: "(94:4) {#if iconLeft}",
		ctx
	});

	return block;
}

// (100:4) {#if iconRight}
function create_if_block_4(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				icon: /*iconRight*/ ctx[8],
				size: /*iconSize*/ ctx[10]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconPack*/ 512) icon_changes.pack = /*iconPack*/ ctx[9];
			if (dirty & /*iconRight*/ 256) icon_changes.icon = /*iconRight*/ ctx[8];
			if (dirty & /*iconSize*/ 1024) icon_changes.size = /*iconSize*/ ctx[10];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_4.name,
		type: "if",
		source: "(100:4) {#if iconRight}",
		ctx
	});

	return block;
}

// (75:4) {#if iconLeft}
function create_if_block_2(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				icon: /*iconLeft*/ ctx[7],
				size: /*iconSize*/ ctx[10]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconPack*/ 512) icon_changes.pack = /*iconPack*/ ctx[9];
			if (dirty & /*iconLeft*/ 128) icon_changes.icon = /*iconLeft*/ ctx[7];
			if (dirty & /*iconSize*/ 1024) icon_changes.size = /*iconSize*/ ctx[10];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(75:4) {#if iconLeft}",
		ctx
	});

	return block;
}

// (81:4) {#if iconRight}
function create_if_block_1(ctx) {
	let icon;
	let current;

	icon = new Icon({
			props: {
				pack: /*iconPack*/ ctx[9],
				icon: /*iconRight*/ ctx[8],
				size: /*iconSize*/ ctx[10]
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(icon.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(icon.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(icon, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const icon_changes = {};
			if (dirty & /*iconPack*/ 512) icon_changes.pack = /*iconPack*/ ctx[9];
			if (dirty & /*iconRight*/ 256) icon_changes.icon = /*iconRight*/ ctx[8];
			if (dirty & /*iconSize*/ 1024) icon_changes.size = /*iconSize*/ ctx[10];
			icon.$set(icon_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(icon.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(icon.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(icon, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(81:4) {#if iconRight}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_if_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*tag*/ ctx[0] === "button") return 0;
		if (/*tag*/ ctx[0] === "a") return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

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
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
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
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach_dev(if_block_anchor);
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
	validate_slots("Button", slots, ['default']);
	let { tag = "button" } = $$props;
	let { type = "" } = $$props;
	let { size = "" } = $$props;
	let { href = "" } = $$props;
	let { nativeType = "button" } = $$props;
	let { loading = false } = $$props;
	let { inverted = false } = $$props;
	let { outlined = false } = $$props;
	let { rounded = false } = $$props;
	let { iconLeft = null } = $$props;
	let { iconRight = null } = $$props;
	let { iconPack = null } = $$props;
	let iconSize = "";

	onMount(() => {
		if (!["button", "a"].includes(tag)) throw new Error(`'${tag}' cannot be used as a tag for a Bulma button`);
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	function click_handler_1(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$new_props => {
		$$invalidate(18, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ("tag" in $$new_props) $$invalidate(0, tag = $$new_props.tag);
		if ("type" in $$new_props) $$invalidate(12, type = $$new_props.type);
		if ("size" in $$new_props) $$invalidate(13, size = $$new_props.size);
		if ("href" in $$new_props) $$invalidate(1, href = $$new_props.href);
		if ("nativeType" in $$new_props) $$invalidate(2, nativeType = $$new_props.nativeType);
		if ("loading" in $$new_props) $$invalidate(3, loading = $$new_props.loading);
		if ("inverted" in $$new_props) $$invalidate(4, inverted = $$new_props.inverted);
		if ("outlined" in $$new_props) $$invalidate(5, outlined = $$new_props.outlined);
		if ("rounded" in $$new_props) $$invalidate(6, rounded = $$new_props.rounded);
		if ("iconLeft" in $$new_props) $$invalidate(7, iconLeft = $$new_props.iconLeft);
		if ("iconRight" in $$new_props) $$invalidate(8, iconRight = $$new_props.iconRight);
		if ("iconPack" in $$new_props) $$invalidate(9, iconPack = $$new_props.iconPack);
		if ("$$scope" in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
	};

	$$self.$capture_state = () => ({
		onMount,
		Icon,
		omit,
		tag,
		type,
		size,
		href,
		nativeType,
		loading,
		inverted,
		outlined,
		rounded,
		iconLeft,
		iconRight,
		iconPack,
		iconSize,
		props
	});

	$$self.$inject_state = $$new_props => {
		$$invalidate(18, $$props = assign(assign({}, $$props), $$new_props));
		if ("tag" in $$props) $$invalidate(0, tag = $$new_props.tag);
		if ("type" in $$props) $$invalidate(12, type = $$new_props.type);
		if ("size" in $$props) $$invalidate(13, size = $$new_props.size);
		if ("href" in $$props) $$invalidate(1, href = $$new_props.href);
		if ("nativeType" in $$props) $$invalidate(2, nativeType = $$new_props.nativeType);
		if ("loading" in $$props) $$invalidate(3, loading = $$new_props.loading);
		if ("inverted" in $$props) $$invalidate(4, inverted = $$new_props.inverted);
		if ("outlined" in $$props) $$invalidate(5, outlined = $$new_props.outlined);
		if ("rounded" in $$props) $$invalidate(6, rounded = $$new_props.rounded);
		if ("iconLeft" in $$props) $$invalidate(7, iconLeft = $$new_props.iconLeft);
		if ("iconRight" in $$props) $$invalidate(8, iconRight = $$new_props.iconRight);
		if ("iconPack" in $$props) $$invalidate(9, iconPack = $$new_props.iconPack);
		if ("iconSize" in $$props) $$invalidate(10, iconSize = $$new_props.iconSize);
		if ("props" in $$props) $$invalidate(11, props = $$new_props.props);
	};

	let props;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		 $$invalidate(11, props = {
			...omit($$props, "loading", "inverted", "nativeType", "outlined", "rounded", "type"),
			class: `button ${type} ${size} ${$$props.class || ""}`
		});

		if ($$self.$$.dirty & /*size*/ 8192) {
			 {
				if (!size || size === "is-medium") {
					$$invalidate(10, iconSize = "is-small");
				} else if (size === "is-large") {
					$$invalidate(10, iconSize = "is-medium");
				} else {
					$$invalidate(10, iconSize = size);
				}
			}
		}
	};

	$$props = exclude_internal_props($$props);

	return [
		tag,
		href,
		nativeType,
		loading,
		inverted,
		outlined,
		rounded,
		iconLeft,
		iconRight,
		iconPack,
		iconSize,
		props,
		type,
		size,
		$$scope,
		slots,
		click_handler,
		click_handler_1
	];
}

class Button extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			tag: 0,
			type: 12,
			size: 13,
			href: 1,
			nativeType: 2,
			loading: 3,
			inverted: 4,
			outlined: 5,
			rounded: 6,
			iconLeft: 7,
			iconRight: 8,
			iconPack: 9
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Button",
			options,
			id: create_fragment.name
		});
	}

	get tag() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set tag(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get type() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get href() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set href(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get nativeType() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set nativeType(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get loading() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set loading(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get inverted() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set inverted(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get outlined() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set outlined(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get rounded() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set rounded(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconLeft() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconLeft(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconRight() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconRight(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get iconPack() {
		throw new Error_1("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set iconPack(value) {
		throw new Error_1("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

export { Button as B };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmJjZTNiOGQ4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbG1hL3NyYy9jb21wb25lbnRzL0J1dHRvbi5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdD5cbiAgaW1wb3J0IHsgb25Nb3VudCB9IGZyb20gJ3N2ZWx0ZSdcbiAgaW1wb3J0IEljb24gZnJvbSAnLi9JY29uLnN2ZWx0ZSdcbiAgaW1wb3J0IHsgb21pdCB9IGZyb20gJy4uL3V0aWxzJ1xuXG4gIC8qKiBIVE1MIHRhZyB0byB1c2UgZm9yIGJ1dHRvbiAoZWl0aGVyICdhJyBvciAnYnV0dG9uJylcbiAgICogQHN2ZWx0ZS1wcm9wIHtTdHJpbmd9IHRhZz1idXR0b25cbiAgICogQHZhbHVlcyA8Y29kZT5idXR0b248L2NvZGU+LCA8Y29kZT5hPC9jb2RlPlxuICAgKiAqL1xuICBleHBvcnQgbGV0IHRhZyA9ICdidXR0b24nXG5cbiAgLyoqIFR5cGUgKGNvbG9yIG9mIGNvbnRyb2wpXG4gICAqIEBzdmVsdGUtcHJvcCB7U3RyaW5nfSBbdHlwZV0gLSBUeXBlIChjb2xvciBvZiBjb250cm9sKVxuICAgKiBAdmFsdWVzICQkY29sb3JzJCRcbiAgICogKi9cbiAgZXhwb3J0IGxldCB0eXBlID0gJydcblxuICAvKiogU2l6ZSBvZiBidXR0b25cbiAgICogQHN2ZWx0ZS1wcm9wIHtTdHJpbmd9IFtzaXplXVxuICAgKiBAdmFsdWVzICQkc2l6ZXMkJFxuICAgKiAqL1xuICBleHBvcnQgbGV0IHNpemUgPSAnJ1xuXG4gIC8qKiBIcmVmIHRvIHVzZSB3aGVuIDxjb2RlPnRhZzwvY29kZT4gaXMgJ2EnXG4gICAqIEBzdmVsdGUtcHJvcCB7U3RyaW5nfSBbaHJlZl1cbiAgICogKi9cbiAgZXhwb3J0IGxldCBocmVmID0gJydcblxuICAvKiogTmF0aXZlIGJ1dHRvbiB0eXBlXG4gICAqIEBzdmVsdGUtcHJvcCB7U3RyaW5nfSBbbmF0aXZlVHlwZV09YnV0dG9uXG4gICAqIEB2YWx1ZXMgQW55IG5hdGl2ZSBidXR0b24gdHlwZSAoYnV0dG9uLCBzdWJtaXQsIHJlc2V0KVxuICAgKiAqL1xuICBleHBvcnQgbGV0IG5hdGl2ZVR5cGUgPSAnYnV0dG9uJ1xuXG4gIGV4cG9ydCBsZXQgbG9hZGluZyA9IGZhbHNlXG4gIGV4cG9ydCBsZXQgaW52ZXJ0ZWQgPSBmYWxzZVxuICBleHBvcnQgbGV0IG91dGxpbmVkID0gZmFsc2VcbiAgZXhwb3J0IGxldCByb3VuZGVkID0gZmFsc2VcblxuICBleHBvcnQgbGV0IGljb25MZWZ0ID0gbnVsbFxuICBleHBvcnQgbGV0IGljb25SaWdodCA9IG51bGxcbiAgZXhwb3J0IGxldCBpY29uUGFjayA9IG51bGxcblxuICBsZXQgaWNvblNpemUgPSAnJ1xuXG4gIG9uTW91bnQoKCkgPT4ge1xuICAgIGlmICghWydidXR0b24nLCAnYSddLmluY2x1ZGVzKHRhZykpIHRocm93IG5ldyBFcnJvcihgJyR7dGFnfScgY2Fubm90IGJlIHVzZWQgYXMgYSB0YWcgZm9yIGEgQnVsbWEgYnV0dG9uYClcbiAgfSlcblxuICAkOiBwcm9wcyA9IHtcbiAgICAuLi5vbWl0KCQkcHJvcHMsICdsb2FkaW5nJywgJ2ludmVydGVkJywgJ25hdGl2ZVR5cGUnLCAnb3V0bGluZWQnLCAncm91bmRlZCcsICd0eXBlJyksXG4gICAgY2xhc3M6IGBidXR0b24gJHt0eXBlfSAke3NpemV9ICR7JCRwcm9wcy5jbGFzcyB8fCAnJ31gLFxuICB9XG5cbiAgJDoge1xuICAgIGlmICghc2l6ZSB8fCBzaXplID09PSAnaXMtbWVkaXVtJykge1xuICAgICAgaWNvblNpemUgPSAnaXMtc21hbGwnXG4gICAgfSBlbHNlIGlmIChzaXplID09PSAnaXMtbGFyZ2UnKSB7XG4gICAgICBpY29uU2l6ZSA9ICdpcy1tZWRpdW0nXG4gICAgfSBlbHNlIHtcbiAgICAgIGljb25TaXplID0gc2l6ZVxuICAgIH1cbiAgfVxuPC9zY3JpcHQ+XG5cbnsjaWYgdGFnID09PSAnYnV0dG9uJ31cbiAgPGJ1dHRvblxuICAgIHsuLi5wcm9wc31cbiAgICB0eXBlPXtuYXRpdmVUeXBlfVxuICAgIGNsYXNzOmlzLWludmVydGVkPXtpbnZlcnRlZH1cbiAgICBjbGFzczppcy1sb2FkaW5nPXtsb2FkaW5nfVxuICAgIGNsYXNzOmlzLW91dGxpbmVkPXtvdXRsaW5lZH1cbiAgICBjbGFzczppcy1yb3VuZGVkPXtyb3VuZGVkfVxuICAgIG9uOmNsaWNrPlxuICAgIHsjaWYgaWNvbkxlZnR9XG4gICAgICA8SWNvbiBwYWNrPXtpY29uUGFja30gaWNvbj17aWNvbkxlZnR9IHNpemU9e2ljb25TaXplfSAvPlxuICAgIHsvaWZ9XG4gICAgPHNwYW4+XG4gICAgICA8c2xvdCAvPlxuICAgIDwvc3Bhbj5cbiAgICB7I2lmIGljb25SaWdodH1cbiAgICAgIDxJY29uIHBhY2s9e2ljb25QYWNrfSBpY29uPXtpY29uUmlnaHR9IHNpemU9e2ljb25TaXplfSAvPlxuICAgIHsvaWZ9XG4gIDwvYnV0dG9uPlxuezplbHNlIGlmIHRhZyA9PT0gJ2EnfVxuICA8YVxuICAgIHtocmVmfVxuICAgIHsuLi5wcm9wc31cbiAgICBjbGFzczppcy1pbnZlcnRlZD17aW52ZXJ0ZWR9XG4gICAgY2xhc3M6aXMtbG9hZGluZz17bG9hZGluZ31cbiAgICBjbGFzczppcy1vdXRsaW5lZD17b3V0bGluZWR9XG4gICAgY2xhc3M6aXMtcm91bmRlZD17cm91bmRlZH1cbiAgICBvbjpjbGljaz5cbiAgICB7I2lmIGljb25MZWZ0fVxuICAgICAgPEljb24gcGFjaz17aWNvblBhY2t9IGljb249e2ljb25MZWZ0fSBzaXplPXtpY29uU2l6ZX0gLz5cbiAgICB7L2lmfVxuICAgIDxzcGFuPlxuICAgICAgPHNsb3QgLz5cbiAgICA8L3NwYW4+XG4gICAgeyNpZiBpY29uUmlnaHR9XG4gICAgICA8SWNvbiBwYWNrPXtpY29uUGFja30gaWNvbj17aWNvblJpZ2h0fSBzaXplPXtpY29uU2l6ZX0gLz5cbiAgICB7L2lmfVxuICA8L2E+XG57L2lmfVxuIl0sIm5hbWVz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