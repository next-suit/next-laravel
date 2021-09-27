<?php


namespace App\Http\Responses;


use Illuminate\Http\Response;

trait JsonResponse
{
    private $statusCode = Response::HTTP_OK;

    // json 返回固定三要素
    private $code = 0;
    private $message = '';
    private $data = [];

    private function getStatusCode(){
        return $this->statusCode;
    }

    private function setStatusCode($status_code){
        $this->statusCode = $status_code;
        return $this;
    }

    private function getCode(){
        return $this->code;
    }

    private function setCode(int $code){
        $this->code = $code;
        return $this;
    }

    private function getMessage(){
        return $this->message;
    }

    private function setMessage($message){
        $this->message = $message;
        return $this;
    }

    private function getData(){
        return $this->data;
    }

    private function setData($data){
        $this->data = $data;
        return $this;
    }

    /**
     * 返回成功的结果
     * @param array $data
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    protected function success($data = [], $message = 'success'){
        return $this->setCode(0)->setMessage($message)->setData($data)->setStatusCode(Response::HTTP_OK)->respond();
    }

    /**
     * 返回失败的结果
     * @param string $message
     * @param array $data
     * @return mixed
     */
    protected function failed($message = 'failed', array $data = []){
        return $this->setCode(1)->setMessage($message)->setData($data)->setStatusCode(Response::HTTP_OK)->respond();
    }

    protected function clearNull($data){
        if($data === null){
            return '';
        }
        $data = json_decode(json_encode($data), true);
        if(is_array($data)){
            foreach($data as $k => $v){
                $data[$k] = $this->clearNull($v);
                if($data[$k] === null){
                    $data[$k] = '';
                }
            }
        }
        return $data;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    private function respond(){
        $Response = \response();
        return $Response->json([
            'code'      => $this->getCode(),
            'message'   => $this->getMessage(),
            'data'      => $this->clearNull($this->getData()),
        ], $this->getStatusCode());
    }
}
