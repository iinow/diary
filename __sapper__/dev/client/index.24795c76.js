import './_rollup-plugin-inject-process-env.d2a692b0.js';
import { w as writable, S as SvelteComponentDev, i as init, s as safe_not_equal, d as dispatch_dev, v as validate_slots, a as space, e as element, t as text, c as create_component, q as query_selector_all, b as detach_dev, f as claim_space, g as claim_element, h as children, j as claim_text, k as claim_component, l as attr_dev, m as add_location, n as insert_dev, o as append_dev, p as mount_component, r as transition_in, u as transition_out, x as destroy_component } from './client.542e72a6.js';
import './index.c54d0a7c.js';
import './ApolloClientStore.236d6e1d.js';
import { B as Button } from './Button.904b0bc7.js';
import { G as GetMe } from './graphql.05a6d93a.js';

const createMe = () => {
    const { set, subscribe } = writable(undefined);
    const call = () => {
        GetMe({}).subscribe((user) => set(user.data));
    };
    return {
        set: (me) => set(me),
        call,
        subscribe,
    };
};
const meStore = createMe();

const file = "src/routes/index.svelte";

// (12:4) <Button tag="a" href="/write">
function create_default_slot(ctx) {
	let t;

	const block = {
		c: function create() {
			t = text("일기 바로가기");
		},
		l: function claim(nodes) {
			t = claim_text(nodes, "일기 바로가기");
		},
		m: function mount(target, anchor) {
			insert_dev(target, t, anchor);
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(12:4) <Button tag=\\\"a\\\" href=\\\"/write\\\">",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let t0;
	let section;
	let div0;
	let h20;
	let t1;
	let t2;
	let button;
	let t3;
	let div1;
	let h21;
	let t4;
	let current;

	button = new Button({
			props: {
				tag: "a",
				href: "/write",
				$$slots: { default: [create_default_slot] },
				$$scope: { ctx }
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			t0 = space();
			section = element("section");
			div0 = element("div");
			h20 = element("h2");
			t1 = text("오늘 일기");
			t2 = space();
			create_component(button.$$.fragment);
			t3 = space();
			div1 = element("div");
			h21 = element("h2");
			t4 = text("이번 달");
			this.h();
		},
		l: function claim(nodes) {
			const head_nodes = query_selector_all("[data-svelte=\"svelte-10upzqq\"]", document.head);
			head_nodes.forEach(detach_dev);
			t0 = claim_space(nodes);
			section = claim_element(nodes, "SECTION", { class: true });
			var section_nodes = children(section);
			div0 = claim_element(section_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			h20 = claim_element(div0_nodes, "H2", { class: true });
			var h20_nodes = children(h20);
			t1 = claim_text(h20_nodes, "오늘 일기");
			h20_nodes.forEach(detach_dev);
			t2 = claim_space(div0_nodes);
			claim_component(button.$$.fragment, div0_nodes);
			div0_nodes.forEach(detach_dev);
			t3 = claim_space(section_nodes);
			div1 = claim_element(section_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			h21 = claim_element(div1_nodes, "H2", { class: true });
			var h21_nodes = children(h21);
			t4 = claim_text(h21_nodes, "이번 달");
			h21_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			section_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			document.title = "Diary";
			attr_dev(h20, "class", "title");
			add_location(h20, file, 10, 4, 293);
			attr_dev(div0, "class", "container");
			add_location(div0, file, 9, 2, 265);
			attr_dev(h21, "class", "title");
			add_location(h21, file, 14, 4, 412);
			attr_dev(div1, "class", "container");
			add_location(div1, file, 13, 2, 384);
			attr_dev(section, "class", "section");
			add_location(section, file, 8, 0, 237);
		},
		m: function mount(target, anchor) {
			insert_dev(target, t0, anchor);
			insert_dev(target, section, anchor);
			append_dev(section, div0);
			append_dev(div0, h20);
			append_dev(h20, t1);
			append_dev(div0, t2);
			mount_component(button, div0, null);
			append_dev(section, t3);
			append_dev(section, div1);
			append_dev(div1, h21);
			append_dev(h21, t4);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			const button_changes = {};

			if (dirty & /*$$scope*/ 1) {
				button_changes.$$scope = { dirty, ctx };
			}

			button.$set(button_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(button.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(button.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(t0);
			if (detaching) detach_dev(section);
			destroy_component(button);
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
	validate_slots("Routes", slots, []);

	{
		meStore.call();
	}

	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Routes> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Button, meStore });
	return [];
}

class Routes extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Routes",
			options,
			id: create_fragment.name
		});
	}
}

export default Routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMjQ3OTVjNzYuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yZS9NZVN0b3JlLnRzIiwiLi4vLi4vLi4vc3JjL3JvdXRlcy9pbmRleC5zdmVsdGUiXSwic291cmNlc0NvbnRlbnQiOltudWxsLCI8c3R5bGU+XG48L3N0eWxlPlxuXG48c3ZlbHRlOmhlYWQ+XG4gIDx0aXRsZT5EaWFyeTwvdGl0bGU+XG48L3N2ZWx0ZTpoZWFkPlxuXG48c2VjdGlvbiBjbGFzcz1cInNlY3Rpb25cIj5cbiAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgIDxoMiBjbGFzcz1cInRpdGxlXCI+7Jik64qYIOydvOq4sDwvaDI+XG4gICAgPEJ1dHRvbiB0YWc9XCJhXCIgaHJlZj1cIi93cml0ZVwiPuydvOq4sCDrsJTroZzqsIDquLA8L0J1dHRvbj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDIgY2xhc3M9XCJ0aXRsZVwiPuydtOuyiCDri6w8L2gyPlxuICA8L2Rpdj5cbjwvc2VjdGlvbj5cblxuPHNjcmlwdCBsYW5nPVwidHNcIj5cbiAgaW1wb3J0IEJ1dHRvbiBmcm9tICdzdmVsbWEvc3JjL2NvbXBvbmVudHMvQnV0dG9uLnN2ZWx0ZSdcbiAgaW1wb3J0IHsgbWVTdG9yZSB9IGZyb20gJ0Avc3RvcmUnXG5cbiAgaWYgKHByb2Nlc3MuYnJvd3Nlcikge1xuICAgIG1lU3RvcmUuY2FsbCgpXG4gIH1cbjwvc2NyaXB0PlxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFJQSxNQUFNLFFBQVEsR0FBRztJQUNmLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsUUFBUSxDQUFhLFNBQVMsQ0FBQyxDQUFBO0lBQzFELE1BQU0sSUFBSSxHQUFHO1FBQ1gsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7S0FDOUMsQ0FBQTtJQUVELE9BQU87UUFDTCxHQUFHLEVBQUUsQ0FBQyxFQUFjLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQztRQUNoQyxJQUFJO1FBQ0osU0FBUztLQUNWLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFTSxNQUFNLE9BQU8sR0FBRyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VDSTdCLE9BQWtCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
