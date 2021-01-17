import './_rollup-plugin-inject-process-env.d2a692b0.js';
import { S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, e as element, g as claim_element, h as children, b as detach_dev, l as attr_dev, m as add_location, I as toggle_class, n as insert_dev, o as append_dev, J as listen_dev, N as noop, F as bubble, _ as listen } from './client.c2574e4a.js';

const file = "node_modules/svelma/src/components/Icon.svelte";

function create_fragment(ctx) {
	let span;
	let i;
	let i_class_value;
	let span_class_value;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = element("span");
			i = element("i");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			i = claim_element(span_nodes, "I", { class: true });
			children(i).forEach(detach_dev);
			span_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(i, "class", i_class_value = "" + (/*newPack*/ ctx[8] + " fa-" + /*icon*/ ctx[0] + " " + /*customClass*/ ctx[2] + " " + /*newCustomSize*/ ctx[6]));
			add_location(i, file, 53, 2, 1189);
			attr_dev(span, "class", span_class_value = "icon " + /*size*/ ctx[1] + " " + /*newType*/ ctx[7] + " " + (/*isLeft*/ ctx[4] && "is-left" || "") + " " + (/*isRight*/ ctx[5] && "is-right" || ""));
			toggle_class(span, "is-clickable", /*isClickable*/ ctx[3]);
			add_location(span, file, 52, 0, 1046);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);
			append_dev(span, i);

			if (!mounted) {
				dispose = listen_dev(span, "click", /*click_handler*/ ctx[12], false, false, false);
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*newPack, icon, customClass, newCustomSize*/ 325 && i_class_value !== (i_class_value = "" + (/*newPack*/ ctx[8] + " fa-" + /*icon*/ ctx[0] + " " + /*customClass*/ ctx[2] + " " + /*newCustomSize*/ ctx[6]))) {
				attr_dev(i, "class", i_class_value);
			}

			if (dirty & /*size, newType, isLeft, isRight*/ 178 && span_class_value !== (span_class_value = "icon " + /*size*/ ctx[1] + " " + /*newType*/ ctx[7] + " " + (/*isLeft*/ ctx[4] && "is-left" || "") + " " + (/*isRight*/ ctx[5] && "is-right" || ""))) {
				attr_dev(span, "class", span_class_value);
			}

			if (dirty & /*size, newType, isLeft, isRight, isClickable*/ 186) {
				toggle_class(span, "is-clickable", /*isClickable*/ ctx[3]);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
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
	validate_slots("Icon", slots, []);
	let { type = "" } = $$props;
	let { pack = "fas" } = $$props;
	let { icon } = $$props;
	let { size = "" } = $$props;
	let { customClass = "" } = $$props;
	let { customSize = "" } = $$props;
	let { isClickable = false } = $$props;
	let { isLeft = false } = $$props;
	let { isRight = false } = $$props;
	let newCustomSize = "";
	let newType = "";

	const writable_props = [
		"type",
		"pack",
		"icon",
		"size",
		"customClass",
		"customSize",
		"isClickable",
		"isLeft",
		"isRight"
	];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Icon> was created with unknown prop '${key}'`);
	});

	function click_handler(event) {
		bubble($$self, event);
	}

	$$self.$$set = $$props => {
		if ("type" in $$props) $$invalidate(9, type = $$props.type);
		if ("pack" in $$props) $$invalidate(10, pack = $$props.pack);
		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
		if ("size" in $$props) $$invalidate(1, size = $$props.size);
		if ("customClass" in $$props) $$invalidate(2, customClass = $$props.customClass);
		if ("customSize" in $$props) $$invalidate(11, customSize = $$props.customSize);
		if ("isClickable" in $$props) $$invalidate(3, isClickable = $$props.isClickable);
		if ("isLeft" in $$props) $$invalidate(4, isLeft = $$props.isLeft);
		if ("isRight" in $$props) $$invalidate(5, isRight = $$props.isRight);
	};

	$$self.$capture_state = () => ({
		type,
		pack,
		icon,
		size,
		customClass,
		customSize,
		isClickable,
		isLeft,
		isRight,
		newCustomSize,
		newType,
		newPack
	});

	$$self.$inject_state = $$props => {
		if ("type" in $$props) $$invalidate(9, type = $$props.type);
		if ("pack" in $$props) $$invalidate(10, pack = $$props.pack);
		if ("icon" in $$props) $$invalidate(0, icon = $$props.icon);
		if ("size" in $$props) $$invalidate(1, size = $$props.size);
		if ("customClass" in $$props) $$invalidate(2, customClass = $$props.customClass);
		if ("customSize" in $$props) $$invalidate(11, customSize = $$props.customSize);
		if ("isClickable" in $$props) $$invalidate(3, isClickable = $$props.isClickable);
		if ("isLeft" in $$props) $$invalidate(4, isLeft = $$props.isLeft);
		if ("isRight" in $$props) $$invalidate(5, isRight = $$props.isRight);
		if ("newCustomSize" in $$props) $$invalidate(6, newCustomSize = $$props.newCustomSize);
		if ("newType" in $$props) $$invalidate(7, newType = $$props.newType);
		if ("newPack" in $$props) $$invalidate(8, newPack = $$props.newPack);
	};

	let newPack;

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*pack*/ 1024) {
			 $$invalidate(8, newPack = pack || "fas");
		}

		if ($$self.$$.dirty & /*customSize, size*/ 2050) {
			 {
				if (customSize) $$invalidate(6, newCustomSize = customSize); else {
					switch (size) {
						case "is-small":
							break;
						case "is-medium":
							$$invalidate(6, newCustomSize = "fa-lg");
							break;
						case "is-large":
							$$invalidate(6, newCustomSize = "fa-3x");
							break;
						default:
							$$invalidate(6, newCustomSize = "");
					}
				}
			}
		}

		if ($$self.$$.dirty & /*type*/ 512) {
			 {
				if (!type) $$invalidate(7, newType = "");
				let splitType = [];

				if (typeof type === "string") {
					splitType = type.split("-");
				} else {
					for (let key in type) {
						if (type[key]) {
							splitType = key.split("-");
							break;
						}
					}
				}

				if (splitType.length <= 1) $$invalidate(7, newType = ""); else $$invalidate(7, newType = `has-text-${splitType[1]}`);
			}
		}
	};

	return [
		icon,
		size,
		customClass,
		isClickable,
		isLeft,
		isRight,
		newCustomSize,
		newType,
		newPack,
		type,
		pack,
		customSize,
		click_handler
	];
}

class Icon extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			type: 9,
			pack: 10,
			icon: 0,
			size: 1,
			customClass: 2,
			customSize: 11,
			isClickable: 3,
			isLeft: 4,
			isRight: 5
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Icon",
			options,
			id: create_fragment.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*icon*/ ctx[0] === undefined && !("icon" in props)) {
			console.warn("<Icon> was created without expected prop 'icon'");
		}
	}

	get type() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set type(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get pack() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set pack(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get icon() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set icon(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get size() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set size(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get customClass() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set customClass(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get customSize() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set customSize(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isClickable() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isClickable(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isLeft() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isLeft(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isRight() {
		throw new Error("<Icon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isRight(value) {
		throw new Error("<Icon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function omit(obj, ...keysToOmit) {
  return Object.keys(obj).reduce((acc, key) => {
    if (keysToOmit.indexOf(key) === -1) acc[key] = obj[key];
    return acc
  }, {})
}

function typeToIcon(type) {
  switch (type) {
    case 'is-info':
      return 'info-circle'
    case 'is-success':
      return 'check-circle'
    case 'is-warning':
      return 'exclamation-triangle'
    case 'is-danger':
      return 'exclamation-circle'
    default:
      return null
  }
}

function getEventsAction(component) {
  return node => {
    const events = Object.keys(component.$$.callbacks);
    const listeners = [];
    events.forEach(event =>
      listeners.push(listen(node, event, e => bubble(component, e)))
    );
    return {
      destroy: () => {
        listeners.forEach(listener => listener());
      }
    };
  };
}

export { Icon as I, getEventsAction as g, omit as o, typeToIcon as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYmUwZTBkOTAuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdmVsbWEvc3JjL2NvbXBvbmVudHMvSWNvbi5zdmVsdGUiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3ZlbG1hL3NyYy91dGlscy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0PlxuICBleHBvcnQgbGV0IHR5cGUgPSAnJ1xuICBleHBvcnQgbGV0IHBhY2sgPSAnZmFzJ1xuICBleHBvcnQgbGV0IGljb25cbiAgZXhwb3J0IGxldCBzaXplID0gJydcbiAgZXhwb3J0IGxldCBjdXN0b21DbGFzcyA9ICcnXG4gIGV4cG9ydCBsZXQgY3VzdG9tU2l6ZSA9ICcnXG4gIGV4cG9ydCBsZXQgaXNDbGlja2FibGUgPSBmYWxzZVxuICBleHBvcnQgbGV0IGlzTGVmdCA9IGZhbHNlXG4gIGV4cG9ydCBsZXQgaXNSaWdodCA9IGZhbHNlXG5cbiAgbGV0IG5ld0N1c3RvbVNpemUgPSAnJ1xuICBsZXQgbmV3VHlwZSA9ICcnXG5cbiAgJDogbmV3UGFjayA9IHBhY2sgfHwgJ2ZhcydcblxuICAkOiB7XG4gICAgaWYgKGN1c3RvbVNpemUpIG5ld0N1c3RvbVNpemUgPSBjdXN0b21TaXplXG4gICAgZWxzZSB7XG4gICAgICBzd2l0Y2ggKHNpemUpIHtcbiAgICAgICAgY2FzZSAnaXMtc21hbGwnOlxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJ2lzLW1lZGl1bSc6XG4gICAgICAgICAgbmV3Q3VzdG9tU2l6ZSA9ICdmYS1sZydcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICdpcy1sYXJnZSc6XG4gICAgICAgICAgbmV3Q3VzdG9tU2l6ZSA9ICdmYS0zeCdcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIG5ld0N1c3RvbVNpemUgPSAnJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICQ6IHtcbiAgICBpZiAoIXR5cGUpIG5ld1R5cGUgPSAnJ1xuICAgIGxldCBzcGxpdFR5cGUgPSBbXVxuICAgIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHNwbGl0VHlwZSA9IHR5cGUuc3BsaXQoJy0nKVxuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gdHlwZSkge1xuICAgICAgICBpZiAodHlwZVtrZXldKSB7XG4gICAgICAgICAgc3BsaXRUeXBlID0ga2V5LnNwbGl0KCctJylcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzcGxpdFR5cGUubGVuZ3RoIDw9IDEpIG5ld1R5cGUgPSAnJ1xuICAgIGVsc2UgbmV3VHlwZSA9IGBoYXMtdGV4dC0ke3NwbGl0VHlwZVsxXX1gXG4gIH1cbjwvc2NyaXB0PlxuXG48c3BhbiBjbGFzcz1cImljb24ge3NpemV9IHtuZXdUeXBlfSB7KGlzTGVmdCAmJiAnaXMtbGVmdCcpIHx8ICcnfSB7KGlzUmlnaHQgJiYgJ2lzLXJpZ2h0JykgfHwgJyd9XCIgY2xhc3M6aXMtY2xpY2thYmxlPXtpc0NsaWNrYWJsZX0gb246Y2xpY2s+XG4gIDxpIGNsYXNzPVwie25ld1BhY2t9IGZhLXtpY29ufSB7Y3VzdG9tQ2xhc3N9IHtuZXdDdXN0b21TaXplfVwiIC8+XG48L3NwYW4+XG4iLCJpbXBvcnQgKiBhcyB0cmFuc2l0aW9ucyBmcm9tICdzdmVsdGUvdHJhbnNpdGlvbidcbmltcG9ydCB7IGJ1YmJsZSwgbGlzdGVuIH0gZnJvbSBcInN2ZWx0ZS9pbnRlcm5hbFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hvb3NlQW5pbWF0aW9uKGFuaW1hdGlvbikge1xuICByZXR1cm4gdHlwZW9mIGFuaW1hdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IGFuaW1hdGlvbiA6IHRyYW5zaXRpb25zW2FuaW1hdGlvbl1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW50ZXJLZXkoZSkge1xuICByZXR1cm4gZS5rZXlDb2RlICYmIGUua2V5Q29kZSA9PT0gMTNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVsZXRlS2V5KGUpIHtcbiAgcmV0dXJuIGUua2V5Q29kZSAmJiBlLmtleUNvZGUgPT09IDQ2XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VzY0tleShlKSB7XG4gIHJldHVybiBlLmtleUNvZGUgJiYgZS5rZXlDb2RlID09PSAyN1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb21pdChvYmosIC4uLmtleXNUb09taXQpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGlmIChrZXlzVG9PbWl0LmluZGV4T2Yoa2V5KSA9PT0gLTEpIGFjY1trZXldID0gb2JqW2tleV1cbiAgICByZXR1cm4gYWNjXG4gIH0sIHt9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHlwZVRvSWNvbih0eXBlKSB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2lzLWluZm8nOlxuICAgICAgcmV0dXJuICdpbmZvLWNpcmNsZSdcbiAgICBjYXNlICdpcy1zdWNjZXNzJzpcbiAgICAgIHJldHVybiAnY2hlY2stY2lyY2xlJ1xuICAgIGNhc2UgJ2lzLXdhcm5pbmcnOlxuICAgICAgcmV0dXJuICdleGNsYW1hdGlvbi10cmlhbmdsZSdcbiAgICBjYXNlICdpcy1kYW5nZXInOlxuICAgICAgcmV0dXJuICdleGNsYW1hdGlvbi1jaXJjbGUnXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV2ZW50c0FjdGlvbihjb21wb25lbnQpIHtcbiAgcmV0dXJuIG5vZGUgPT4ge1xuICAgIGNvbnN0IGV2ZW50cyA9IE9iamVjdC5rZXlzKGNvbXBvbmVudC4kJC5jYWxsYmFja3MpO1xuICAgIGNvbnN0IGxpc3RlbmVycyA9IFtdO1xuICAgIGV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+XG4gICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW4obm9kZSwgZXZlbnQsIGUgPT4gYnViYmxlKGNvbXBvbmVudCwgZSkpKVxuICAgICk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRlc3Ryb3k6ICgpID0+IHtcbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2gobGlzdGVuZXIgPT4gbGlzdGVuZXIoKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBEQXFEYSxHQUFPLHdCQUFNLEdBQUksNEJBQUcsR0FBVyw4QkFBRyxHQUFhOztpRUFEekMsR0FBSSx3QkFBRyxHQUFPLHdCQUFJLEdBQU0sT0FBSSxTQUFTLElBQUssRUFBRSx1QkFBSSxHQUFPLE9BQUksVUFBVSxJQUFLLEVBQUU7c0RBQXVCLEdBQVc7Ozs7Ozs7Ozs7Ozs7eUhBQ3BILEdBQU8sd0JBQU0sR0FBSSw0QkFBRyxHQUFXLDhCQUFHLEdBQWE7Ozs7cUhBRHpDLEdBQUksd0JBQUcsR0FBTyx3QkFBSSxHQUFNLE9BQUksU0FBUyxJQUFLLEVBQUUsdUJBQUksR0FBTyxPQUFJLFVBQVUsSUFBSyxFQUFFOzs7Ozt1REFBdUIsR0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FuRHBILElBQUksR0FBRyxFQUFFO09BQ1QsSUFBSSxHQUFHLEtBQUs7T0FDWixJQUFJO09BQ0osSUFBSSxHQUFHLEVBQUU7T0FDVCxXQUFXLEdBQUcsRUFBRTtPQUNoQixVQUFVLEdBQUcsRUFBRTtPQUNmLFdBQVcsR0FBRyxLQUFLO09BQ25CLE1BQU0sR0FBRyxLQUFLO09BQ2QsT0FBTyxHQUFHLEtBQUs7S0FFdEIsYUFBYSxHQUFHLEVBQUU7S0FDbEIsT0FBTyxHQUFHLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFFYixPQUFPLEdBQUcsSUFBSSxJQUFJLEtBQUs7Ozs7O1FBR3BCLFVBQVUsa0JBQUUsYUFBYSxHQUFHLFVBQVU7YUFFaEMsSUFBSTtXQUNM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
