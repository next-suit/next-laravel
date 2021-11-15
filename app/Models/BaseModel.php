<?php


namespace App\Models;


use DateTimeInterface;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    protected $guarded = [];
    protected $perPage = 15;

    public function __construct(array $attributes = []) {
        parent::__construct($attributes);
        $rows = request('rows');
        if($rows > 0) {
            $this->perPage = $rows;
        }
    }

    public function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
