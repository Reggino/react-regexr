/*
 * Event
 * Visit http://createjs.com/ for documentation, updates and examples.
 *
 * Copyright (c) 2010 gskinner.com, inc.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * A collection of Classes that are shared across all the CreateJS libraries.  The classes are included in the minified
 * files of each library and are available on the createsjs namespace directly.
 *
 * <h4>Example</h4>
 *      myObject.addEventListener("change", createjs.proxy(myMethod, scope));
 *
 * @module CreateJS
 * @main CreateJS
 */

// @ts-ignore
window.createjs = window.createjs || {};

/**
 * Contains properties and methods shared by all events for use with
 * {{#crossLink "EventDispatcher"}}{{/crossLink}}.
 *
 * Note that Event objects are often reused, so you should never
 * rely on an event object's state outside of the call stack it was received in.
 * @class RegexrEvent
 * @param {String} type The event type.
 * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
 * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
 * @constructor
 **/
export class RegexrEvent {
  constructor(type: string, bubbles?: boolean, cancelable?: boolean) {
    this.initialize(type, !!bubbles, !!cancelable);
  }
  // events:

  // public properties:

  /**
   * The type of event.
   * @property type
   * @type String
   **/
  public type: string = "UNKNOWN";

  /**
   * The object that generated an event.
   * @property target
   * @type Object
   * @default null
   * @readonly
   */
  public target = null;

  /**
   * The current target that a bubbling event is being dispatched from. For non-bubbling events, this will
   * always be the same as target. For example, if childObj.parent = parentObj, and a bubbling event
   * is generated from childObj, then a listener on parentObj would receive the event with
   * target=childObj (the original target) and currentTarget=parentObj (where the listener was added).
   * @property currentTarget
   * @type Object
   * @default null
   * @readonly
   */
  public currentTarget = null;

  /**
   * For bubbling events, this indicates the current event phase:<OL>
   *    <LI> capture phase: starting from the top parent to the target</LI>
   *    <LI> at target phase: currently being dispatched from the target</LI>
   *    <LI> bubbling phase: from the target to the top parent</LI>
   * </OL>
   * @property eventPhase
   * @type Number
   * @default 0
   * @readonly
   */
  public eventPhase = 0;

  /**
   * Indicates whether the event will bubble through the display list.
   * @property bubbles
   * @type Boolean
   * @default false
   * @readonly
   */
  public bubbles = false;

  /**
   * Indicates whether the default behaviour of this event can be cancelled via
   * {{#crossLink "Event/preventDefault"}}{{/crossLink}}. This is set via the Event constructor.
   * @property cancelable
   * @type Boolean
   * @default false
   * @readonly
   */
  public cancelable = false;

  /**
   * The epoch time at which this event was created.
   * @property timeStamp
   * @type Number
   * @default 0
   * @readonly
   */
  public timeStamp = 0;

  /**
   * Indicates if {{#crossLink "Event/preventDefault"}}{{/crossLink}} has been called
   * on this event.
   * @property defaultPrevented
   * @type Boolean
   * @default false
   * @readonly
   */
  public defaultPrevented = false;

  /**
   * Indicates if {{#crossLink "Event/stopPropagation"}}{{/crossLink}} or
   * {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called on this event.
   * @property propagationStopped
   * @type Boolean
   * @default false
   * @readonly
   */
  public propagationStopped = false;

  /**
   * Indicates if {{#crossLink "Event/stopImmediatePropagation"}}{{/crossLink}} has been called
   * on this event.
   * @property immediatePropagationStopped
   * @type Boolean
   * @default false
   * @readonly
   */
  public immediatePropagationStopped = false;

  /**
   * Indicates if {{#crossLink "Event/remove"}}{{/crossLink}} has been called on this event.
   * @property removed
   * @type Boolean
   * @default false
   * @readonly
   */
  public removed = false;

  // constructor:
  /**
   * Initialization method.
   * @method initialize
   * @param {String} type The event type.
   * @param {Boolean} bubbles Indicates whether the event will bubble through the display list.
   * @param {Boolean} cancelable Indicates whether the default behaviour of this event can be cancelled.
   * @protected
   **/
  public initialize(type: string, bubbles: boolean, cancelable: boolean) {
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
    this.timeStamp = new Date().getTime();
  }

  // public methods:

  /**
   * Sets {{#crossLink "Event/defaultPrevented"}}{{/crossLink}} to true.
   * Mirrors the DOM event standard.
   * @method preventDefault
   **/
  public preventDefault() {
    this.defaultPrevented = true;
  }

  /**
   * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} to true.
   * Mirrors the DOM event standard.
   * @method stopPropagation
   **/
  public stopPropagation() {
    this.propagationStopped = true;
  }

  /**
   * Sets {{#crossLink "Event/propagationStopped"}}{{/crossLink}} and
   * {{#crossLink "Event/immediatePropagationStopped"}}{{/crossLink}} to true.
   * Mirrors the DOM event standard.
   * @method stopImmediatePropagation
   **/
  public stopImmediatePropagation() {
    this.immediatePropagationStopped = this.propagationStopped = true;
  }

  /**
   * Causes the active listener to be removed via removeEventListener();
   *
   *        myBtn.addEventListener("click", function(evt) {
   * 			// do stuff...
   * 			evt.remove(); // removes this listener.
   * 		});
   *
   * @method remove
   **/
  public remove() {
    this.removed = true;
  }

  /**
   * Returns a clone of the Event instance.
   * @method clone
   * @return {RegexrEvent} a clone of the Event instance.
   **/
  public clone() {
    return new RegexrEvent(this.type, this.bubbles, this.cancelable);
  }

  /**
   * Returns a string representation of this object.
   * @method toString
   * @return {String} a string representation of the instance.
   **/
  public toString() {
    return "[Event (type=" + this.type + ")]";
  }
}
