import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import  StickyHeader from './modules/StickyHeader';
import $ from "jquery";


var mobileMenu = new MobileMenu();

new RevealonScroll($(".feature-item"), "85%");
new RevealonScroll($(".testimonial"), "75%");

var stickyHeader = new StickyHeader();
