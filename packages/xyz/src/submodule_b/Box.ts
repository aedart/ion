/**
 * A Box...
 */
export default class Box
{
    /**
     * Width of this box
     *
     * @type {number}
     *
     * @protected
     */
    protected _width: number;

    /**
     * Height of this box
     *
     * @type {number}
     *
     * @protected
     */
    protected _height: number;

    /**
     * Length of this box
     *
     * @type {number}
     *
     * @protected
     */
    protected _length: number;

    /**
     * Creates a new box instance
     *
     * @param {number} width
     * @param {number} height
     * @param {number} length
     */
    constructor(width:number, height: number, length: number) {
        this._width = width;
        this._height = height;
        this._length = length;
    }

    /**
     * Returns this box's width
     *
     * @returns {number}
     */
    public get width(): number
    {
        return this._width;
    }

    /**
     * Returns this box's height
     *
     * @returns {number}
     */
    public get height(): number
    {
        return this._height;
    }

    /**
     * Returns this box's length
     *
     * @returns {number}
     */
    public get length(): number
    {
        return this._length;
    }
}
