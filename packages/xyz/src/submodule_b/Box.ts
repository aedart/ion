/**
 * A Box...
 */
export default class Box
{
    /**
     * Width of this box
     *
     * @protected
     */
    protected _width: number;

    /**
     * Height of this box
     * @protected
     */
    protected _height: number;

    /**
     * Length of this box
     *
     * @protected
     */
    protected _length: number;

    /**
     * Creates a new box instance
     *
     * @param width Width of box
     * @param height Height of box
     * @param length length of box
     */
    constructor(width:number, height: number, length: number) {
        this._width = width;
        this._height = height;
        this._length = length;
    }

    /**
     * Returns this box's width
     */
    public get width(): number
    {
        return this._width;
    }

    /**
     * Returns this box's height
     */
    public get height(): number
    {
        return this._height;
    }

    /**
     * Returns this box's length
     */
    public get length(): number
    {
        return this._length;
    }
}
