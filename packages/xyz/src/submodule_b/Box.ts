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
     * Creates a new box instance
     *
     * @param width Width of box
     * @param height Height of box
     */
    constructor(width:number, height: number) {
        this._width = width;
        this._height = height;
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
}
